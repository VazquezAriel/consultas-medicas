import { Type } from 'class-transformer';
import { IsString, IsNumber, IsPositive, IsOptional, IsNotEmpty, IsIn, IsArray, ValidateNested, IsObject, Min } from 'class-validator';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { DetalleComprobante } from '../entities/detalle-comprobante.entity';
import { CreateDetalleComprobanteDto } from './create-detalle-comprobante.dto';
import { AssignPacienteDto } from '../../citas/dto/assign-paciente.dto';

export class CreateComprobanteDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    observacion?: string;

    @IsIn(['Generada', 'Pendiente', 'Cancelada', 'Autorizada', 'Enviada', 'No Autorizada'])
    @IsOptional()
    estado?: string;

    @IsNumber()
    @Min(0)
    iva: number;

    @IsNumber()
    @IsPositive()
    subTotal: number;

    @IsNumber()
    @IsPositive()
    total: number;

    @IsObject()
    @ValidateNested()
    @Type(() => AssignPacienteDto)
    paciente: Paciente;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateDetalleComprobanteDto)
    detalles:DetalleComprobante[];

}
