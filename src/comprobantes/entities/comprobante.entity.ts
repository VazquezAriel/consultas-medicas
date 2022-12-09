import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comprobante {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'date'})
    fecha: Date;

    @Column({type: 'text', default: 'sin ninguna observacion'})
    observacion: string;

    @Column('int', {unique: true})
    numero: number;

    @Column('float')
    total: number;

    @BeforeInsert()
    getFecha(){
        this.fecha = new Date();
    }
    
}
