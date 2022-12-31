import { Consulta } from "../../consultas/entities/consulta.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comprobante } from "./comprobante.entity";

@Entity()
export class DetalleComprobante {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    cantidad:number;

    @Column('numeric')
    precioUnitario:number;

    @Column('float')
    total:number;

    @OneToOne(() => Consulta, {nullable: false})
    @JoinColumn()
    consulta:Consulta;

    @ManyToOne(() => Comprobante, (comprobante) => comprobante.detalles, {onDelete:"CASCADE"})
    comprobante:Comprobante;
    
}
