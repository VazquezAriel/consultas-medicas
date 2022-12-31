import { Medico } from '../../medicos/entities/medico.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Especialidad {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    descripcion: string;

    @OneToMany(() => Medico, (medico) => medico.especialidad, {nullable: true})
    medicos?:Medico[];
}
