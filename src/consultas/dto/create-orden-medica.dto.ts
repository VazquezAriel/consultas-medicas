
import { Type } from 'class-transformer';
import { IsString, IsArray, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { CreatePreescripcionDto } from './create-preescripcion-medica.dto';
import { PreescripcionMedica } from '../entities/preescripcion-medica.entity';

export class CreateOrdenDto {

    @IsArray()
    @IsString({each:true})
    @IsNotEmpty()
    sintomas:string[];

    @IsString()
    @IsNotEmpty()
    diagnostico:string;

    @IsString()
    @IsNotEmpty()
    tratamiento:string;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePreescripcionDto)
    preescripciones?:PreescripcionMedica[];

}