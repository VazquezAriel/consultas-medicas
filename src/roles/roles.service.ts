import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import handleExceptions from '../comun/exepciones/handle-exceptions';
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

    try {

      await this.repository.save(rol);

    } catch (error) {

      handleExceptions(error);
      
    }

    return rol;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findByDescripcion(descripcion: string) {

    const rol = await this.repository.findOneBy({descripcion: descripcion});

    if (!rol) throw new NotFoundException(`El rol con descripcion '${descripcion}' no existe`);

    return rol;
  }
}
