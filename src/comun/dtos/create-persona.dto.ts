import { IsEmail, IsNumberString, IsOptional, IsString, IsUUID, Length, MinLength } from "class-validator";

export class CreatePersonaDto {

    @IsString()
    @Length(10,10)
    cedula: string;

    @IsString()
    @MinLength(3)
    nombres: string;

    @IsString()
    @MinLength(3)
    apellidos: string;

    @IsString()
    @IsOptional()
    @IsNumberString()
    telefono?: string;

    @IsString()
    @IsOptional()
    @IsNumberString()
    celular?: string;

    @IsString()
    @MinLength(3)
    direccion: string;

    @IsEmail()
    email: string;
}
