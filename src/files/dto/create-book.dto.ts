import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Titulo do Livro',
    example: 'Os Kamaiurá',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descrição do Livro',
    example: 'Os Kamaiurá em livro.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Tipo do Livro',
    example: 'Manual',
  })
  @IsString()
  type: string;
}
