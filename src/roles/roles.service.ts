import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Rol)
    private readonly repository:Repository<Rol>
  ){}

  async create(createRoleDto: CreateRolDto) {

    const rol = this.repository.create(createRoleDto);

    await this.repository.save(rol);

    return rol;
  }

  findAll() {
    return this.repository.find();
  }

  async findByDescripcion(descripcion: string) {

    const rol = await this.repository.findOneBy({descripcion: descripcion});

    if (!rol) throw new NotFoundException(`This rol (${descripcion}) not exist`);

    return rol;
  }
}
