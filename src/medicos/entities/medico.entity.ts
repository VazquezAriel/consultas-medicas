import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Persona } from '../../comun/clases/persona';
import { Especialidad } from '../../especialidades/entities/especialidad.entity';

@Entity()
export class Medico extends Persona{

    @ManyToOne(() => Especialidad, (especialidad) => especialidad.medicos, {nullable: false, eager:true})
    especialidad:Especialidad;

    @OneToMany(() => Consulta, (consulta) => consulta.medico, {nullable: true})
    consultas?:Consulta[];
}

