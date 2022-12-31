import { Comprobante } from '../../comprobantes/entities/comprobante.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';

@Entity()
export class Transaccion {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('timestamp')
    fecha:Date;

    @Column('text')
    asunto:string;

    @Column('text')
    tipo:string;

    @Column('float')
    monto: number;

    @ManyToOne(() => Comprobante, (comprobante) => comprobante.transacciones, {nullable: true})
    comprobante?:Comprobante;

    @BeforeInsert()
    getFecha(){
        this.fecha = new Date();
    }
}
