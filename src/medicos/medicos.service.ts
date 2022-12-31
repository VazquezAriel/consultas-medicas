import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Like, Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import handleExceptions from '../comun/exepciones/handle-exceptions';
import { isUUID } from 'class-validator';
import { EspecialidadesService } from '../especialidades/especialidades.service';
import { Especialidad } from '../especialidades/entities/especialidad.entity';

@Injectable()
export class MedicosService {

  constructor(
    @InjectRepository(Medico)
    private readonly repository:Repository<Medico>,

    private readonly especialidadesService: EspecialidadesService,
  ){}

  async create({especialidad, ...createMedicoDto}: CreateMedicoDto) {

    const especialidadObj = await this.especialidadesService.findOneByDescripcion(especialidad);

    const medico = this.repository.create({especialidad:especialidadObj, ...createMedicoDto});

    try {

      await this.repository.save(medico);
      
    } catch (error) {
      
      handleExceptions(error);

    }
    return {...medico, especialidad: medico.especialidad.descripcion};
  }

  async findAll() {

    const medicos = await this.repository.find({
      order: {
        nombres: 'ASC'
      },
    })

    return medicos.map( medico => ({
      ...medico,
      especialidad: medico.especialidad.descripcion
    }));
  }

  async findBy(termino: string) {

    let medico:Medico;

    if (isUUID(termino))
      medico =  await this.findOneById(termino);

    if (medico)
      return {...medico, especialidad: medico.especialidad.descripcion};

    const medicos:Medico[] = await this.repository.find({
      where: [
        {nombres: Like(`%${termino}%`)},
        {apellidos: Like(`%${termino}%`)},
        {cedula: Like(`%${termino}%`)},
      ],
      order : {
        nombres: 'ASC'
      }
    })

    return medicos.map(medico => ({
      ...medico,
      especialidad: medico.especialidad.descripcion
    }));
  }

  async findOneById(id:string) {

    const medico = await this.repository.findOneBy({id:id});

    if (!medico)
      throw new NotFoundException(`Medico con id ${id} no encontrado`);

    return medico;

  }

  async update(id: string, {especialidad, ...updateMedicoDto}: UpdateMedicoDto) {

    let especialidadObj:Especialidad;

    const medico = await this.repository.preload({
      id:id,
      ...updateMedicoDto
    })

    if (!medico) throw new NotFoundException(`Medico con id ${id} no encontrado`);

    if (especialidad) {

      especialidadObj = await this.especialidadesService.findOneByDescripcion(especialidad);

      medico.especialidad = especialidadObj ? especialidadObj : (await this.findOneById(id)).especialidad;

    }

    try {

      await this.repository.save(medico);

    } catch (error) {

      handleExceptions(error);
    }

    return medico;
  }

  async remove(id: string) {

    const medico = await this.findOneById(id);

    await this.repository.remove(medico);

    return {...medico, especialidad: medico.especialidad.descripcion};
  }
}
