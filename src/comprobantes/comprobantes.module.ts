import { Module } from '@nestjs/common';
import { ComprobantesService } from './comprobantes.service';
import { ComprobantesController } from './comprobantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comprobante } from './entities/comprobante.entity';
import { DetalleComprobante } from './entities/detalle-comprobante.entity';

@Module({
  controllers: [ComprobantesController],
  providers: [ComprobantesService],
  imports: [
    TypeOrmModule.forFeature([Comprobante, DetalleComprobante])
  ]
})
export class ComprobantesModule {}
