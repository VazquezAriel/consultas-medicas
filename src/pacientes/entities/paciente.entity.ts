import { Cita } from 'src/citas/entities/cita.entity';
import { Persona } from 'src/comun/clases/persona';
import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Paciente extends Persona{

    @Column('date')
    fechaNacimiento?: Date;

    @OneToMany(() => Cita, (cita) => cita.paciente, {nullable: true})
    citas?:Cita[];

}
