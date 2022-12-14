import { IsObject, IsString, MinLength } from 'class-validator';
import { CreatePersonaDto } from '../../comun/dtos/create-persona.dto';
import { Especialidad } from '../../especialidades/entities/especialidad.entity';

export class CreateMedicoDto extends CreatePersonaDto{

    @IsString()
    @MinLength(1)
    especialidad:string;
}
