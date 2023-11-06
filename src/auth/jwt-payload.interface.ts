import { Role } from 'src/roles/entities/role.entity';

export interface JwtPayload {
  first_name: string;
  last_name: string;
  cpf: string;
  role: Role;
}
