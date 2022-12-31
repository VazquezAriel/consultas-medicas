import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { PacientesModule } from '../pacientes/pacientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';

@Module({
  controllers: [CitasController],
  providers: [CitasService],
  imports:[
    PacientesModule,
    TypeOrmModule.forFeature([Cita])
  ]
})
export class CitasModule {}
