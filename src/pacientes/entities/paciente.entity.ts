import { Persona } from 'src/comun/clases/persona';
import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Paciente extends Persona{

    @Column('date')
    fechaNacimiento?: Date;

    @OneToMany(() => Consulta, (consulta) => consulta.paciente, {nullable: true})
    consultas?:Consulta[];

}
