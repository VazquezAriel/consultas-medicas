import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { Consulta } from './entities/consulta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreescripcionMedica } from './entities/preescripcion-medica.entity';
import { OrdenMedica } from './entities/orden-medica.entity';

@Module({
  controllers: [ConsultasController],
  providers: [ConsultasService],
  imports: [
    TypeOrmModule.forFeature([Consulta, PreescripcionMedica, OrdenMedica])
  ]
})
export class ConsultasModule {}
