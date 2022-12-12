import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { Repository } from 'typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class ColaboradoresService {

  constructor(
    @InjectRepository(Colaborador)
    private readonly repository:Repository<Colaborador>,

    private readonly rolesService:RolesService,
    
  ){}

  async create({rol, ...colaboradorDto}: CreateColaboradorDto) {

    const rolObj = await this.rolesService.findByDescripcion(rol);

    try{

      const colaborador = this.repository.create({...colaboradorDto, rol: rolObj});

      await this.repository.save(colaborador);

      return {...colaborador, rol: colaborador.rol.descripcion};

    } catch (error) {

      this.handleExceptions(error);

    }
  }

  async findAll() {

    const colaboradores = await this.repository.find();

    return colaboradores.map(colaborador => ({
      ...colaborador,
      rol: colaborador.rol.descripcion
    }));
    
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
