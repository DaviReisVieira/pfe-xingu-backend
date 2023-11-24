import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Book)
    private readonly bookEntityRepository: Repository<Book>,
    private configService: ConfigService,
  ) {
    this.configService = configService;
  }

  certificadoBuffer() {
    return readFileSync(join(process.cwd() + '/public/', 'proxy.cer'));
  }

  bookFileBuffer(id: string) {
    return readFileSync(join(process.cwd() + '/files/books/', `${id}`));
  }

  async createBookAndFile(
    file: Express.Multer.File,
    req: Request,
    createBookDto: CreateBookDto,
  ) {
    const book = new Book();
    book.title = createBookDto.title;
    book.description = createBookDto.description;
    book.type = createBookDto.type;
    book.file_name = file.filename;
    book.content_length = file.size;
    book.content_type = file.mimetype;
    book.url = `${req.protocol}://${req.get('host')}/${this.configService.get(
      'app.apiPrefix',
    )}/files/livros/${file.filename}`;

    return await this.bookEntityRepository.save(book);
  }

  async getAllBooks() {
    return await this.bookEntityRepository.find();
  }
}
