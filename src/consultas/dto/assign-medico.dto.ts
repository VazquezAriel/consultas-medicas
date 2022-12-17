
import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateMedicoDto } from 'src/medicos/dto/create-medico.dto';

export class AssignMedicoDto extends PartialType(CreateMedicoDto){

    @IsUUID()
    id:string;
}