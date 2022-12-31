import { Injectable,  NotFoundException } from '@nestjs/common';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { Like, Repository } from 'typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from '../roles/roles.service';
import { isUUID } from 'class-validator';
import handleExceptions from '../comun/exepciones/handle-exceptions';
import { Rol } from '../roles/entities/rol.entity';

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

      handleExceptions(error);

    }
  }

  async findAll() {

    const colaboradores = await this.repository.find();

    return colaboradores.map(colaborador => ({
      ...colaborador,
      rol: colaborador.rol.descripcion
    }));
    
  }

  async findBy(termino: string) {

    let colaborador:Colaborador;

    if (isUUID(termino))
      colaborador = await this.repository.findOneBy({id:termino});

    if (colaborador)
      return {...colaborador, rol: colaborador.rol.descripcion};

    const colaboradores:Colaborador[] = await this.repository.find({
      where: [
        {nombres: Like(`%${termino}%`)},
        {apellidos: Like(`%${termino}%`)},
        {cedula: Like(`%${termino}%`)}
      ]
    });

    return colaboradores.map(colaborador => ({
      ...colaborador,
      rol: colaborador.rol.descripcion
    }));
  }

  async findOneById(id:string) {

    const colaborador = await this.repository.findOneBy({id:id});

    if (!colaborador)
      throw new NotFoundException(`Colaborador con id ${id} no encontrado`);

    return colaborador;
  }

  async update(id: string, {rol, ...updateColaboradorDto}: UpdateColaboradorDto) {

    let rolObj:Rol;

    const colaborador = await this.repository.preload({
      id: id,
      ...updateColaboradorDto,
    });

    if (!colaborador) throw new NotFoundException(`Colaborador con id ${id} no encontrado`);

    if (rol) {

      rolObj = await this.rolesService.findByDescripcion(rol);

      colaborador.rol = rolObj ? rolObj : (await this.findOneById(id)).rol;
    }
    
    try {

      await this.repository.save(colaborador);

    } catch (error) {

      handleExceptions(error);
    }

    return {...colaborador, rol: colaborador.rol.descripcion};
  }

  async remove(id: string) {

    const colaborador = await this.findOneById(id);

    await this.repository.remove(colaborador);

    return colaborador;
  }

}
