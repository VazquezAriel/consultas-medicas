
import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateComprobanteDto } from '../../comprobantes/dto/create-comprobante.dto';

export class AssignComprobanteDto extends PartialType(CreateComprobanteDto){

    @IsUUID()
    id:string;
}