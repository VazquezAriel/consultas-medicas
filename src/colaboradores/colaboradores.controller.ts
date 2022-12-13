import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ColaboradoresService } from './colaboradores.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';

@Controller('colaboradores')
export class ColaboradoresController {
  constructor(private readonly colaboradoresService: ColaboradoresService) {}

  @Post()
  create(@Body() createColaboradoreDto: CreateColaboradorDto) {
    return this.colaboradoresService.create(createColaboradoreDto);
  }

  @Get()
  findAll() {
    return this.colaboradoresService.findAll();
  }

  @Get(':termino')
  findBy(@Param('termino', ) termino: string) {
    return this.colaboradoresService.findBy(termino);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateColaboradoreDto: UpdateColaboradorDto) {
    return this.colaboradoresService.update(id, updateColaboradoreDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.colaboradoresService.remove(id);
  }
}
