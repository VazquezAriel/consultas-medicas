import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { EspecialidadesModule } from '../especialidades/especialidades.module';

@Module({
  controllers: [MedicosController],
  providers: [MedicosService],
  imports: [
    EspecialidadesModule,
    TypeOrmModule.forFeature([Medico])
  ]
})
export class MedicosModule {}
