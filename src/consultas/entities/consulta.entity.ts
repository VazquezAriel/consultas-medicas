import { Medico } from 'src/medicos/entities/medico.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consulta {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    observacion:string;

    @Column('numeric')
    costo:number;

    @ManyToOne(() => Paciente, (paciente) => paciente.consultas, {nullable: false, eager: true})
    paciente:Paciente;

    @ManyToOne(() => Medico, (medico) => medico.consultas, {nullable: false, eager: true})
    medico:Medico;

}
