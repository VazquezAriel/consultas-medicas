import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

export default function handleExceptions(error:any) {
    if (error.code === '23505' || error.code === '23503') 
      throw new BadRequestException(error.detail);

    console.log(error.code);
    
    throw new InternalServerErrorException('Unexpected error, check server logs');
}
