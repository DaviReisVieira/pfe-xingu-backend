import { User } from 'src/auth/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserLogin extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.logins)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  token: string;

  @Column()
  ip_address: string;

  @Column({ nullable: true, type: 'float' })
  latitude: number;

  @Column({ nullable: true, type: 'float' })
  longitude: number;

  @Column('jsonb', { nullable: true })
  location: any;

  @CreateDateColumn()
  login_timestamp: Date;
}
