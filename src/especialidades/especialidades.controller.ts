import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Post()
  create(@Body() createEspecialidadeDto: CreateEspecialidadDto) {
    return this.especialidadesService.create(createEspecialidadeDto);
  }

  @Get()
  findAll() {
    return this.especialidadesService.findAll();
  }

  @Get(':descripcion')
  findBy(@Param('descripcion') descripcion: string) {
    return this.especialidadesService.findBy(descripcion);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEspecialidadeDto: UpdateEspecialidadDto) {
    return this.especialidadesService.update(id, updateEspecialidadeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.especialidadesService.remove(id);
  }
}
