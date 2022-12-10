import { Module } from '@nestjs/common';
import { ColaboradoresService } from './colaboradores.service';
import { ColaboradoresController } from './colaboradores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity';

@Module({
  controllers: [ColaboradoresController],
  providers: [ColaboradoresService],
  imports: [
    TypeOrmModule.forFeature([Colaborador])
  ]

})
export class ColaboradoresModule {}
