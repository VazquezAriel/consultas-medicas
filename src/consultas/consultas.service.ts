import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Consulta } from './entities/consulta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import handleExceptions from '../comun/exepciones/handle-exceptions';

@Injectable()
export class ConsultasService {

  constructor(
    @InjectRepository(Consulta)
    private readonly repository:Repository<Consulta>,
  ){}

  async create(createConsultaDto:CreateConsultaDto) {

    const consulta = this.repository.create(createConsultaDto);
    
    try {

      await this.repository.save(consulta);
      
    } catch (error) {

      handleExceptions(error);

    }

    return consulta;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {

    const consulta = await this.repository.findOneBy({id:id});

    if (!consulta)
      throw new NotFoundException(`No se encontro la consulta ${id}`);

    return consulta;
  }

  async update(id: string, updateConsultaDto: UpdateConsultaDto) {

    const consulta = await this.repository.preload({
      ...updateConsultaDto,
      id:id,
    })

    if (!consulta) throw new NotFoundException(`No se encontro la consulta ${id}`);

    try {

      await this.repository.save(consulta);
      
    } catch (error) {

      handleExceptions(error);
    }

    return consulta;
  }

  async remove(id: string) {

    const consulta = await this.findOne(id);

    await this.repository.remove(consulta);

    return consulta;
  }
}
