import { IsEmail, IsIn, IsMobilePhone, IsOptional, IsPhoneNumber, IsString, Length, MaxLength, MinLength } from "class-validator";

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
    @IsPhoneNumber()
    telefono?: string;

    @IsString()
    @IsOptional()
    @IsPhoneNumber()
    celular?: string;

    @IsString()
    @MinLength(3)
    direccion: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    contrasenia: string;

    @IsIn(['secretaria', 'invitado', 'recepcionista'])
    rol: string;
}
