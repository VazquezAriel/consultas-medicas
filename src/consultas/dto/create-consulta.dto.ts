import { Type } from 'class-transformer';
import { IsString, MinLength, IsOptional, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { AssignPacienteDto } from './assign-paciente.dto';
import { Medico } from '../../medicos/entities/medico.entity';
import { AssignMedicoDto } from './assign-medico.dto';
import { CreateOrdenDto } from './create-orden-medica.dto';
import { OrdenMedica } from '../entities/orden-medica.entity';

export class CreateConsultaDto {

    @IsOptional()
    @IsString()
    @MinLength(1)
    observacion?:string;

    @IsNumber()
    costo:number;

    @ValidateNested()
    @Type(() => AssignMedicoDto)
    medico:Medico;

    @ValidateNested()
    @Type(() => AssignPacienteDto)
    paciente:Paciente;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateOrdenDto)
    ordenesMedicas:OrdenMedica[];

}
