import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreatePersonaDto } from '../../comun/dtos/create-persona.dto';

export class CreateMedicoDto extends CreatePersonaDto{

    @IsString()
    @IsNotEmpty()
    usuario:string;

    @IsString()
    @MinLength(8)
    contrasenia:string;

    @IsString()
    @MinLength(1)
    especialidad:string;
}
