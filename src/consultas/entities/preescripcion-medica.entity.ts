import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrdenMedica } from './orden-medica.entity';


@Entity()
export class PreescripcionMedica {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    medicamento:string;

    @Column('text')
    instruccion:string;

    @Column('numeric')
    dias:number;

    @ManyToOne(() => OrdenMedica, (ordenMedica) => ordenMedica.preescripciones, {onDelete:'CASCADE'})
    ordenMedica:OrdenMedica;
}