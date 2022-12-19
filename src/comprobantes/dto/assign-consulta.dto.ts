
import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateConsultaDto } from '../../consultas/dto/create-consulta.dto';

export class AssignConsultaDto extends PartialType(CreateConsultaDto){

    @IsUUID()
    id:string;
}