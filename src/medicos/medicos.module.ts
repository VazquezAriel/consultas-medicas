import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';

@Module({
  controllers: [MedicosController],
  providers: [MedicosService],
  imports: [
    TypeOrmModule.forFeature([Medico])
  ]
})
export class MedicosModule {}
