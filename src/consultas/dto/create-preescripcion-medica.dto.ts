import { IsString, IsArray, IsNotEmpty, IsNumber, IsInt, IsPositive } from 'class-validator';

export class CreatePreescripcionDto {

    @IsString()
    @IsNotEmpty()
    medicamento:string;

    @IsString()
    @IsNotEmpty()
    instruccion:string;

    @IsInt()
    @IsPositive()
    dias:number;

}