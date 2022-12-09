import { IsString, MinLength, IsNumber, IsPositive, IsOptional, IsInt } from "class-validator";

export class CreateComprobanteDto {

    @IsString()
    @MinLength(2)
    @IsOptional()
    observacion?: string;

    @IsNumber()
    @IsPositive()
    @IsInt()
    numero: number;

    @IsNumber()
    @IsPositive()
    total: number;
}
