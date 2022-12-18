import { Type } from 'class-transformer';
import { IsString, MinLength, IsOptional, IsNumber, ValidateNested, IsArray, IsObject } from 'class-validator';
import { CreateOrdenDto } from './create-orden-medica.dto';
import { OrdenMedica } from '../entities/orden-medica.entity';
import { Cita } from 'src/citas/entities/cita.entity';
import { AssignCitaDto } from './assign-cita.dto';

export class CreateConsultaDto {

    @IsOptional()
    @IsString()
    @MinLength(1)
    observacion?:string;

    @IsNumber()
    costo:number;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateOrdenDto)
    ordenesMedicas:OrdenMedica[];

    @IsObject()
    @ValidateNested()
    @Type(() => AssignCitaDto)
    cita:Cita;

}
