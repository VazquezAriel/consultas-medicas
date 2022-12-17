import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PreescripcionMedica } from './preescripcion-medica.entity';
import { Consulta } from './consulta.entity';


@Entity()
export class OrdenMedica {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text', {
        array: true,
    })
    sintomas:string[];

    @Column('text')
    diagnostico:string;

    @Column('text')
    tratamiento:string;

    @ManyToOne(() => Consulta, (consulta) => consulta.ordenesMedicas, {onDelete:'CASCADE'})
    consulta:Consulta;

    @OneToMany(() => PreescripcionMedica, (preescripcion) => preescripcion.ordenMedica, {eager: true, cascade:true})
    preescripciones?:PreescripcionMedica[];
}