import { IsEmail, IsNumberString, IsObject, IsOptional, IsString, Length, MinLength } from "class-validator";
import { Rol } from "src/roles/entities/rol.entity";

export class CreateColaboradorDto {

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

    @IsString()
    @MinLength(8)
    contrasenia: string;

    @IsString()
    @MinLength(1)
    rol: string;
}
