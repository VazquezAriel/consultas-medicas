import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { Repository } from 'typeorm';
import { Transaccion } from './entities/transaccion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import handleExceptions from '../comun/exepciones/handle-exceptions';

@Injectable()
export class TransaccionesService {

  constructor(
    @InjectRepository(Transaccion)
    private readonly repository:Repository<Transaccion>
  ){}

  async create(createTransaccionDto: CreateTransaccionDto) {

    const transaccion = this.repository.create(createTransaccionDto);

    try {

      await this.repository.save(transaccion);
      
    } catch (error) {
      
      handleExceptions(error);

    }

    return transaccion;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {

    const transaccion = await this.repository.findOneBy({id:id});

    if (!transaccion) throw new NotFoundException(`No existe la transaccion ${id}`);

    return transaccion;
  }

  async update(id: string, updateTransaccioneDto: UpdateTransaccionDto) {

    const transaccion = await this.repository.preload({
      ...updateTransaccioneDto,
      id:id
    })

    if (!transaccion) throw new NotFoundException(`No existe la transaccion ${id}`);

    try {
      
      await this.repository.save(transaccion);

    } catch (error) {
      
      handleExceptions(error)

    }

    return transaccion;
  }

  async remove(id: string) {

    const transaccion = await this.findOne(id);

    await this.repository.remove(transaccion)

    return transaccion;
  }
}
