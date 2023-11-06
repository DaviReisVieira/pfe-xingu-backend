import { ApiProperty } from '@nestjs/swagger';
import { Transform } from '@nestjs/class-transformer';
import { IsNumber } from '@nestjs/class-validator';

export class PaginationDto {
  @ApiProperty({ default: 1, required: false, description: 'Page number' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({ default: 50, required: false, description: 'Page size' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
