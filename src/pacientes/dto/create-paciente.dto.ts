import { IsDate, IsDateString, Length } from 'class-validator';
import { CreatePersonaDto } from "src/comun/dtos/create-persona.dto";

export class CreatePacienteDto extends CreatePersonaDto{

    @Length(10,10)
    @IsDateString()
    fechaNacimiento: Date;
}
