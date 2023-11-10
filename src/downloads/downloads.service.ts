import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DownloadsService {
  constructor() {}

  certificadoBuffer() {
    return readFileSync(join(process.cwd() + '/public/', 'proxy.cer'));
  }

  livroBuffer(id: string) {
    return readFileSync(join(process.cwd() + '/public/livros/', `${id}.pdf`));
  }
}
