import { BeforeInsert, Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleComprobante } from './detalle-comprobante.entity';
import { Transaccion } from '../../transacciones/entities/transaccion.entity';
import { Paciente } from "../../pacientes/entities/paciente.entity";

@Entity()
export class Comprobante {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated("increment")
    numero: number;

    @Column({type: 'date'})
    fecha: Date;

    @Column({type: 'text', default: 'sin ninguna observacion'})
    observacion: string;

    @Column('float')
    iva: number;

    @Column('float')
    subTotal: number;

    @Column('float')
    total: number;

    @Column('text', {default: 'Generada'})
    estado:string;

    @OneToMany(() => DetalleComprobante, (detalle) => detalle.comprobante, {nullable: false, cascade:true, eager:true} )
    detalles:DetalleComprobante[];

    @ManyToOne(() => Paciente, (paciente) => paciente.comprobantes, {eager:true})
    paciente:Paciente;

    @OneToMany(() => Transaccion, (transaccion) => transaccion.comprobante, {nullable: true} )
    transacciones?:Transaccion[];

    @BeforeInsert()
    getFecha(){
        this.fecha = new Date();
    }
    
}
