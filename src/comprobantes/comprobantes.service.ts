import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.repository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} comprobante`;
  }

  update(id: number, updateComprobanteDto: UpdateComprobanteDto) {
    return `This action updates a #${id} comprobante`;
  }

  remove(id: number) {
    return `This action removes a #${id} comprobante`;
  }

  private handleExceptions(error:any) {

    if (error.code === '23505') 
      throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
