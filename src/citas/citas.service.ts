import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { InjectRepository } from '@nestjs/typeorm';
import handleExceptions from '../comun/exepciones/handle-exceptions';
import { PacientesService } from '../pacientes/pacientes.service';

@Injectable()
export class CitasService {

  constructor(
    @InjectRepository(Cita)
    private readonly repository:Repository<Cita>,
    private readonly pacientesService:PacientesService
  ){}

  async create(createCitaDto: CreateCitaDto) {

    const cita = this.repository.create(createCitaDto);

    try {

      await this.repository.save(cita);
      
    } catch (error) {
      
      handleExceptions(error);

    }

    return cita;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    
    const cita = await this.repository.findOneBy({id:id});

    if (!cita)
      throw new NotFoundException(`No se encontro la cita ${id}`);

    return cita;
  }

  async findByCedula(cedula: string) {
    
    const paciente = await this.pacientesService.findOneByCedula(cedula);

    return await this.repository.findBy({paciente:{id: paciente.id}});
  }

  async update(id: string, updateCitaDto: UpdateCitaDto) {

    const cita = await this.repository.preload({
      ...updateCitaDto,
      id:id
    })

    if (!cita) throw new NotFoundException(`No se encontro la cita ${id}`);

    try {

      await this.repository.save(cita);
      
    } catch (error) {
      
      handleExceptions(error);

    }

    return cita;
  }

  async remove(id: string) {

    const cita = await this.findOne(id);

    await this.repository.remove(cita);

    return cita;
  }
}
