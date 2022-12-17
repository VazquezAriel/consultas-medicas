
import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreatePacienteDto } from '../../pacientes/dto/create-paciente.dto';

export class AssignPacienteDto extends PartialType(CreatePacienteDto){

    @IsUUID()
    id:string;
}