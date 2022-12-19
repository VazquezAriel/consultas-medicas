import { Module } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaccion } from './entities/transaccion.entity';

@Module({
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
  imports:[
    TypeOrmModule.forFeature([
      Transaccion
    ])
  ]
})
export class TransaccionesModule {}
