import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Like, Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import handleExceptions from '../comun/exepciones/handle-exceptions';

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

  findBy(termino: string) {

    return this.repository.find({
      where: [
        {nombres: Like(`%${termino}%`)},
        {apellidos: Like(`%${termino}%`)},
        {cedula: Like(`%${termino}%`)}
      ]
    });
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return `This action updates a #${id} paciente`;
  }

  remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
