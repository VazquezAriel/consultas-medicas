import { Medico } from '../../medicos/entities/medico.entity';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cita {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('timestamp', {nullable:false})
    fechaHoraEntrada:Date;

    @Column('timestamp', {nullable: true})
    fechaHoraSalida:Date;

    @Column('text', {default:"NaN"})
    observacion:string;

    @Column('text')
    estado:string;

    @ManyToOne(() => Paciente, (paciente) => paciente.citas, {nullable: false, eager: true})
    paciente:Paciente;

    @ManyToOne(() => Medico, (medico) => medico.citas, {nullable: false, eager: true})
    medico:Medico;

}
