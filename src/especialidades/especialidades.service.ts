import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { Like, Repository } from 'typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import handleExceptions from '../comun/exepciones/handle-exceptions';

@Injectable()
export class EspecialidadesService {

  constructor(
    @InjectRepository(Especialidad)
    private readonly repository:Repository<Especialidad>
  ){}

  async create(createEspecialidadeDto: CreateEspecialidadDto) {

    const especialidad = this.repository.create(createEspecialidadeDto);

    try {

      await this.repository.save(especialidad);
      
    } catch (error) {
      
      handleExceptions(error);

    }

    return especialidad;
  }

  async findAll() {
    return await this.repository.find({
      order: {
        descripcion: 'ASC'
      }
    });
  }

  async findBy(termino: string) {

    if (isUUID(termino))
      return await this.findOneById(termino);

    return await this.repository.find({
      where:{
        descripcion: Like(`%${termino}%`)
      },
      order: {
        descripcion: 'ASC'
      }
    });

  }

  async findOneById(id:string) {

    const especialidad = await this.repository.findOneBy({id:id});

    if (!especialidad)
      throw new NotFoundException(`Especialidad con id ${id} no encontrada`);

    return especialidad;

  }

  async findOneByDescripcion(descripcion: string) {

    const especialidad = await this.repository.findOneBy({descripcion: descripcion});

    if (!especialidad) throw new NotFoundException(`La especialidad '${descripcion}' no fue encontrada`);

    return especialidad ;
  }

  async update(id: string, updateEspecialidadeDto: UpdateEspecialidadDto) {

    const especialidad = await this.repository.preload({
      id:id,
      ...updateEspecialidadeDto
    })

    if (!especialidad) throw new NotFoundException(`Especialidad con id ${id} no encontrada`);

    try {

      await this.repository.save(especialidad);

    } catch (error) {

      handleExceptions(error);
    }

    return especialidad;
  }

  async remove(id: string) {

    const especialidad = await this.findOneById(id);

    await this.repository.delete(especialidad);

    return especialidad;
  }
}
