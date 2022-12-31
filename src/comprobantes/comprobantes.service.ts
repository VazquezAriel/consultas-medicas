import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import handleExceptions from '../comun/exepciones/handle-exceptions';
import { Repository } from 'typeorm';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { UpdateComprobanteDto } from './dto/update-comprobante.dto';
import { Comprobante } from './entities/comprobante.entity';

@Injectable()
export class ComprobantesService {

  constructor(
    @InjectRepository(Comprobante)
    private readonly repository:Repository<Comprobante>
  ){}

  async create(createComprobanteDto: CreateComprobanteDto) {

    try {

      const comprobante = this.repository.create(createComprobanteDto);

      await this.repository.save(comprobante);

      return comprobante;
      
    } catch (error) {

      handleExceptions(error);
      
    }
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {

    const comprobante = await this.repository.findOneBy({id:id});

    if(!comprobante)  throw new NotFoundException(`No se encontro la factura ${id}`);

    return comprobante;
  }

  async update(id: string, updateComprobanteDto: UpdateComprobanteDto) {

    const comprobante =  await this.repository.preload({
      ...updateComprobanteDto,
      id:id
    })

    if (!comprobante) throw new NotFoundException(`No se encontro la factura ${id}`);

    try {

      await this.repository.save(comprobante);

    } catch (error) {

      handleExceptions(error);
      
    }

    return comprobante;
  }

  async remove(id: string) {

    const comprobante = await this.findOne(id);

    await this.repository.remove(comprobante);

    return comprobante;
  }

}
