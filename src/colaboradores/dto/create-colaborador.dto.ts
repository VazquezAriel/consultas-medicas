import { IsEmail, IsNumberString, IsOptional, IsString, Length, MinLength } from "class-validator";
import { CreatePersonaDto } from '../../comun/dtos/create-persona.dto';

export class CreateColaboradorDto extends CreatePersonaDto {

    @IsString()
    @MinLength(8)
    contrasenia: string;

    @IsString()
    @MinLength(1)
    rol: string;
}
