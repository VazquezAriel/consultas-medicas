import { Persona } from 'src/comun/clases/persona';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paciente extends Persona{

    @Column('date')
    fechaNacimiento: Date;

}
