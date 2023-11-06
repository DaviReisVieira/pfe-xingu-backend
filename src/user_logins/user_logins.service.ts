import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogin } from './entities/user_login.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserLoginsService {
  constructor(
    @InjectRepository(UserLogin)
    private readonly userLoginRepository: Repository<UserLogin>,
    private configureService: ConfigService,
  ) {
    this.configureService = configureService;
  }

  async getLocationInfo(latitude: number, longitude: number) {
    const apiKey = this.configureService.get('app.openCageData') as string;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(userLoginDto: UserLoginDto, user: User): Promise<UserLogin> {
    // const location = await this.getLocationInfo(
    //   userLoginDto.latitude,
    //   userLoginDto.longitude,
    // );

    const userLogin = this.userLoginRepository.create({
      user: user,
      token: userLoginDto.token,
      ip_address: userLoginDto.ip_address,
      latitude: userLoginDto.latitude,
      longitude: userLoginDto.longitude,
    });

    return await this.userLoginRepository.save(userLogin);
  }
}
