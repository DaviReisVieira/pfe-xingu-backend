import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserLoginDto } from 'src/user_logins/dto/user-login.dto';

export class SignInAuthCredentialsDto extends UserLoginDto {
  @ApiProperty({
    description: 'CPF do usuário',
    example: '000.000.000-00',
  })
  @IsString()
  @MinLength(11)
  @MaxLength(14)
  @Transform(({ value }) => value.replace(/[^0-9]/g, ''))
  cpf: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '12345678',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha é muito fraca',
  })
  password: string;
}
