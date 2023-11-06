import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignUpAuthCredentialsDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'Sobrenome do usuário',
    example: 'Silva',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'CNPJ da empresa',
    example: '00.000.000/0000-00',
  })
  @IsString()
  @MinLength(14)
  @MaxLength(18)
  @Transform(({ value }) => value.replace(/[^0-9]/g, ''))
  cnpj_empresa: string;

  @ApiProperty({
    description: 'Nome da Empresa',
    example: 'Empresa XPTO',
  })
  @IsString()
  nome_empresa: string;

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
