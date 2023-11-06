import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from './user-status.enum';
import { EntityHelper } from 'src/utils/entity-helper';
import { UserLogin } from 'src/user_logins/entities/user_login.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  cpf: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  nome_empresa: string;

  @Column({ nullable: false })
  cnpj_empresa: string;

  @Column({
    nullable: false,
    type: 'enum',
    default: UserStatus.INATIVO,
    enum: UserStatus,
  })
  status: UserStatus;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @OneToMany(() => UserLogin, (user_logins) => user_logins.id)
  logins: UserLogin[];

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;

  @DeleteDateColumn()
  data_exclusao?: Date;
}
