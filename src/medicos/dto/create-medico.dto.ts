import { IsString, MinLength } from 'class-validator';
import { CreatePersonaDto } from '../../comun/dtos/create-persona.dto';

export class CreateMedicoDto extends CreatePersonaDto{

    @IsString()
    @MinLength(1)
    especialidad:string;
}
