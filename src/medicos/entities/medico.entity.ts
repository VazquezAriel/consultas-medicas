import { Entity, ManyToOne } from 'typeorm';
import { Persona } from '../../comun/clases/persona';
import { Especialidad } from '../../especialidades/entities/especialidad.entity';

@Entity()
export class Medico extends Persona{

    @ManyToOne(() => Especialidad, (especialidad) => especialidad.medicos, {nullable: false, eager:true})
    especialidad:Especialidad;

}
