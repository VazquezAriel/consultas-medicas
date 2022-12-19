import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateComprobanteDto } from './create-comprobante.dto';

export class UpdateComprobanteDto extends PartialType(OmitType(CreateComprobanteDto, ['detalles'] as const)) {}
