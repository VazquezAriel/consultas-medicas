import { Cita } from 'src/citas/entities/cita.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Persona } from '../../comun/clases/persona';
import { Especialidad } from '../../especialidades/entities/especialidad.entity';

@Entity()
export class Medico extends Persona{

    @ManyToOne(() => Especialidad, (especialidad) => especialidad.medicos, {nullable: false, eager:true})
    especialidad:Especialidad;

    @OneToMany(() => Cita, (cita) => cita.medico, {nullable: true})
    citas?:Cita[];
}

