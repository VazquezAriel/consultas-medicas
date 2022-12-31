import { Cita } from '../../citas/entities/cita.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Persona } from '../../comun/clases/persona';
import { Especialidad } from '../../especialidades/entities/especialidad.entity';

@Entity()
export class Medico extends Persona{

    @Column('text', {nullable:true})
    usuario:string;

    @Column('text', {nullable: true})
    contrasenia:string;

    @ManyToOne(() => Especialidad, (especialidad) => especialidad.medicos, {nullable: false, eager:true})
    especialidad:Especialidad;

    @OneToMany(() => Cita, (cita) => cita.medico, {nullable: true})
    citas?:Cita[];
}

