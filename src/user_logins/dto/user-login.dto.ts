import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: 'Token',
    example: '12345',
  })
  @IsOptional()
  @IsString()
  token?: string;

  @ApiProperty({
    description: 'IP Address',
    example: '123.123.2.1',
  })
  @IsString()
  ip_address: string;

  @ApiProperty({
    description: 'Latitude',
  })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({
    description: 'Longitude',
  })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}
