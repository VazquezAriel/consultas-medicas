import { Type } from "class-transformer";
import { IsDateString, IsIn, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Medico } from "../../medicos/entities/medico.entity";
import { Paciente } from "../../pacientes/entities/paciente.entity";
import { AssignMedicoDto } from "./assign-medico.dto";
import { AssignPacienteDto } from "./assign-paciente.dto";

export class CreateCitaDto {

    @IsDateString()
    fechaHoraEntrada:Date;

    @IsOptional()
    @IsDateString()
    fechaHoraSalida:Date;

    @IsOptional()
    @IsString()
    observacion:string;
    
    @IsIn(['Registrada', 'Reagendada', 'Pendiente', 'Iniciada', 'Finalizada', 'Cancelada'])
    estado:string;

    @IsObject()
    @ValidateNested()
    @Type(() => AssignPacienteDto)
    paciente:Paciente;

    @IsObject()
    @ValidateNested()
    @Type(() => AssignMedicoDto)
    medico:Medico;

}
