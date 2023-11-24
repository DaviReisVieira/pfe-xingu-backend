import { Column, Entity } from 'typeorm';

import { FileEntity } from './file.entity';

@Entity()
export class Book extends FileEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;
}
