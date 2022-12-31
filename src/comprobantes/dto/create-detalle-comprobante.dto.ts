import { Type } from 'class-transformer';
import { IsNumber, IsPositive, ValidateNested, IsObject } from 'class-validator';
import { Consulta } from '../../consultas/entities/consulta.entity';
import { AssignConsultaDto } from './assign-consulta.dto';

export class CreateDetalleComprobanteDto {

    @IsNumber()
    @IsPositive()
    cantidad: number;

    @IsNumber()
    @IsPositive()
    precioUnitario: number;

    @IsNumber()
    @IsPositive()
    total: number;

    @IsObject()
    @ValidateNested()
    @Type(() => AssignConsultaDto)
    consulta:Consulta;
}
