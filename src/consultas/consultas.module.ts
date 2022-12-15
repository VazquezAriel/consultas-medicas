import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { Consulta } from './entities/consulta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ConsultasController],
  providers: [ConsultasService],
  imports: [
    TypeOrmModule.forFeature([Consulta])
  ]
})
export class ConsultasModule {}
