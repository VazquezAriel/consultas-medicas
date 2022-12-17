
import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateCitaDto } from 'src/citas/dto/create-cita.dto';

export class AssignCitaDto extends PartialType(CreateCitaDto){

    @IsUUID()
    id:string;
}