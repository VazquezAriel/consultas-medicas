import { Module } from '@nestjs/common';
import { ColaboradoresService } from './colaboradores.service';
import { ColaboradoresController } from './colaboradores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [ColaboradoresController],
  providers: [ColaboradoresService],
  imports: [
    RolesModule,
    TypeOrmModule.forFeature([Colaborador])
  ]

})
export class ColaboradoresModule {}
