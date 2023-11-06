import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpAuthCredentialsDto } from './dto/signup-auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserStatus } from './entities/user-status.enum';
import { SignInAuthCredentialsDto } from './dto/signin-auth-credentials.dto';
import { UserLoginsService } from 'src/user_logins/user_logins.service';
import { RolesService } from 'src/roles/roles.service';
import { RoleEnum } from 'src/roles/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private userLoginService: UserLoginsService,
    private roleService: RolesService,
  ) {
    this.jwtService = jwtService;
    this.userLoginService = userLoginService;
  }

  async signUp(authCredentialsDto: SignUpAuthCredentialsDto): Promise<void> {
    const { first_name, last_name, cpf, password, nome_empresa, cnpj_empresa } =
      authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = await this.roleService.getRoleById(RoleEnum.user);

    const user = this.userRepository.create({
      first_name: first_name,
      last_name: last_name,
      cpf: cpf,
      password: hashedPassword,
      status: UserStatus.INATIVO,
      role: userRole,
      nome_empresa: nome_empresa,
      cnpj_empresa: cnpj_empresa,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate cpf
        throw new ConflictException('Usuário já existente.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    signInAuthCredentialsDto: SignInAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { cpf, password } = signInAuthCredentialsDto;

    const user = await this.userRepository.findOne({
      where: { cpf },
    });

    if (!user) {
      throw new UnauthorizedException('Por favor, verifique suas credenciais.');
    }

    if (user.status == UserStatus.INATIVO) {
      throw new UnauthorizedException('Usuário inativo.');
    } else if (user.status == UserStatus.BLOQUEADO) {
      throw new UnauthorizedException('Usuário bloqueado.');
    } else if (user.status == UserStatus.ATIVO) {
      if (await bcrypt.compare(password, user.password)) {
        const payload: JwtPayload = {
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          cpf,
        };
        const accessToken: string = this.jwtService.sign(payload);

        await this.userLoginService.create(
          { ...signInAuthCredentialsDto, token: accessToken },
          user,
        );

        return { accessToken };
      } else {
        throw new UnauthorizedException(
          'Por favor, verifique suas credenciais.',
        );
      }
    } else {
      throw new UnauthorizedException('Por favor, verifique suas credenciais.');
    }
  }
}
