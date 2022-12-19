import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}

  @Post()
  create(@Body() createTransaccioneDto: CreateTransaccionDto) {
    return this.transaccionesService.create(createTransaccioneDto);
  }

  @Get()
  findAll() {
    return this.transaccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.transaccionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTransaccioneDto: UpdateTransaccionDto) {
    return this.transaccionesService.update(id, updateTransaccioneDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.transaccionesService.remove(id);
  }
}
