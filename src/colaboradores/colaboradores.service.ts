import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { Repository } from 'typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColaboradoresService {

  constructor(
    @InjectRepository(Colaborador)
    private readonly repository:Repository<Colaborador>
  ){}

  async create(createColaboradoreDto: CreateColaboradorDto) {

    try {

      const colaborador = this.repository.create(createColaboradoreDto);

      await this.repository.save(colaborador);

      return colaborador;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.repository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} colaboradore`;
  }

  update(id: number, updateColaboradoreDto: UpdateColaboradorDto) {
    return `This action updates a #${id} colaboradore`;
  }

  remove(id: number) {
    return `This action removes a #${id} colaboradore`;
  }

  private handleExceptions(error:any) {

    if (error.code === '23505') 
      throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
