import { Comprobante } from '../../comprobantes/entities/comprobante.entity';
import { IsIn, IsNotEmpty, IsNumber, IsObject, IsPositive, IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AssignComprobanteDto } from './assign-comprobante.dto';
export class CreateTransaccionDto {

    @IsString()
    @IsNotEmpty()
    asunto:string;

    @IsIn(['Ingreso', 'Egreso'])
    tipo:string;

    @IsNumber()
    @IsPositive()
    monto:number;

    @IsOptional()
    @ValidateNested()
    @Type(() => AssignComprobanteDto)
    comprobante?:Comprobante;
}
