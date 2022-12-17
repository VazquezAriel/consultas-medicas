import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Like, Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import handleExceptions from '../comun/exepciones/handle-exceptions';
import { isUUID } from 'class-validator';

@Injectable()
export class PacientesService {

  constructor(
    @InjectRepository(Paciente)
    private readonly repository:Repository<Paciente>
  ){}

  async create(createPacienteDto: CreatePacienteDto) {
    try {

      const paciente = this.repository.create(createPacienteDto);

      await this.repository.save(paciente);

      return paciente;

    } catch (error) {

      handleExceptions(error)

    }
  }

  async findAll() {
    return await this.repository.find();
  }

  async findBy(termino: string) {

    let paciente:Paciente;

    if (isUUID(termino))
      paciente = await this.repository.findOneBy({id:termino});

    if (paciente)
    
      return paciente;

    return this.repository.find({
      where: [
        {nombres: Like(`%${termino}%`)},
        {apellidos: Like(`%${termino}%`)}
      ]
    });
  }

  async findOneById(id:string) {

    const paciente = await this.repository.findOneBy({id:id});

    if (!paciente)
      throw new NotFoundException(`Paciente con id ${id} not found`);

    return paciente;
  }

  async findOneByCedula(cedula:string) {

    const paciente = await this.repository.findOneBy({cedula:cedula});

    if (!paciente)
      throw new NotFoundException(`Paciente con cedula ${cedula} not encontrado`);

    return paciente;
  }

  async update(id: string, updatePacienteDto: UpdatePacienteDto) {

    const paciente = await this.repository.preload({
      id: id,
      ...updatePacienteDto
    })

    if (!paciente) throw new NotFoundException(`Paciente con id ${id} no encontrado`);

    try {

      await this.repository.save(paciente);

    } catch (error) {

      handleExceptions(error);
    }

    return paciente;
  }

  async remove(id: string) {

    const paciente = await this.findOneById(id);

    await this.repository.remove(paciente);

    return paciente;
  }
}
