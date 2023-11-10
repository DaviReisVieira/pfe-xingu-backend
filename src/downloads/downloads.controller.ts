import { Controller, Get, Param, Res, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DownloadsService } from './downloads.service';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('download')
@ApiTags('download')
export class DownloadsController {
  constructor(private readonly downloadService: DownloadsService) {}

  @Get('certificado')
  certificadoBuffer(@Res() response: Response) {
    const file = this.downloadService.certificadoBuffer();

    response.setHeader('Content-Type', 'application/x-x509-ca-cert');
    response.setHeader('Content-Disposition', 'attachment; filename=proxy.cer');
    response.send(file);
  }

  @Get('livros/:id')
  livroBuffer(@Param('id') id: string, @Res() response: Response) {
    const file = this.downloadService.livroBuffer(id);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', `attachment; filename=${id}`);
    response.send(file);
  }
}
