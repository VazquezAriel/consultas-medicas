import { Injectable } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Consulta } from './entities/consulta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import handleExceptions from 'src/comun/exepciones/handle-exceptions';

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

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} consulta`;
  }

  update(id: number, updateConsultaDto: UpdateConsultaDto) {
    return `This action updates a #${id} consulta`;
  }

  remove(id: number) {
    return `This action removes a #${id} consulta`;
  }
}
