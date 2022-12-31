import { Cita } from '../../citas/entities/cita.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrdenMedica } from './orden-medica.entity';

@Entity()
export class Consulta {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    detalle:string;

    @Column('numeric')
    costo:number;

    @OneToMany(() => OrdenMedica, (ordenes) => ordenes.consulta, {nullable: false, eager: true, cascade:true})
    ordenesMedicas:OrdenMedica[];

    @OneToOne(() => Cita, {nullable: false, eager:true})
    @JoinColumn()
    cita:Cita;

}
