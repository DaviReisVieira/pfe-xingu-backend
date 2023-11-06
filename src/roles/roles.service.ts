import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(name: string): Promise<Role> {
    const role = this.roleRepository.create({ name });
    return await this.roleRepository.save(role);
  }

  async getRoleById(id: number): Promise<Role> {
    return await this.roleRepository.findOne({
      where: { id },
    });
  }
}
