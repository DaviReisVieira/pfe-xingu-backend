import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FilesService } from './files.service';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CreateBookDto } from './dto/create-book.dto';
import multerConfig from 'files/multer-config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@UseInterceptors(LoggingInterceptor)
@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // @Get('certificado')
  // certificadoBuffer(@Res() response: Response) {
  //   const file = this.filesService.certificadoBuffer();

  //   response.setHeader('Content-Type', 'application/x-x509-ca-cert');
  //   response.setHeader('Content-Disposition', 'attachment; filename=proxy.cer');
  //   response.send(file);
  // }

  @Get('livros/:fileName')
  livroBuffer(@Param('fileName') fileName: string, @Res() response: Response) {
    const file = this.filesService.bookFileBuffer(fileName);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileName}`,
    );
    response.send(file);
  }

  @Post('livros')
  @UseInterceptors(FileInterceptor('book', multerConfig))
  createBookFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Body() createBookDto: CreateBookDto,
  ) {
    return this.filesService.createBookAndFile(file, req, createBookDto);
  }

  @Get('livros')
  getAllBooks() {
    return this.filesService.getAllBooks();
  }
}
