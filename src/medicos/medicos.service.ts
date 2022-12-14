import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Like, Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import handleExceptions from 'src/comun/exepciones/handle-exceptions';
import { isUUID } from 'class-validator';

@Injectable()
export class MedicosService {

  constructor(
    @InjectRepository(Medico)
    private readonly repository:Repository<Medico>
  ){}

  async create(createMedicoDto: CreateMedicoDto) {

    const medico = this.repository.create(createMedicoDto);

    try {

      await this.repository.save(medico);
      
    } catch (error) {
      
      handleExceptions(error);

    }
  }

  async findAll() {
    return await this.repository.find({
      order: {
        nombres: 'ASC'
      }
    });
  }

  async findBy(termino: string) {

    if (isUUID(termino))
      return await this.findOneById(termino);

    return await this.repository.find({
      where: [
        {nombres: Like(`%${termino}%`)},
        {apellidos: Like(`%${termino}%`)},
        {cedula: Like(`%${termino}%`)},
      ],
      order : {
        nombres: 'ASC'
      }
    });
  }

  async findOneById(id:string) {

    const medico = await this.repository.findOneBy({id:id});

    if (!medico)
      throw new NotFoundException(`Medico con id ${id} no encontrado`);

    return medico;

  }

  update(id: string, updateMedicoDto: UpdateMedicoDto) {
    return `This action updates a #${id} medico`;
  }

  remove(id: string) {
    return `This action removes a #${id} medico`;
  }
}
