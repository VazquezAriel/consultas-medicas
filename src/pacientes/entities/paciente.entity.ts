import { Cita } from 'src/citas/entities/cita.entity';
import { Comprobante } from 'src/comprobantes/entities/comprobante.entity';
import { Persona } from 'src/comun/clases/persona';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Paciente extends Persona{

    @Column('date')
    fechaNacimiento?: Date;

    @OneToMany(() => Cita, (cita) => cita.paciente, {nullable: true})
    citas?:Cita[];

    @OneToMany(() => Comprobante, (comprobante) => comprobante.paciente, {nullable: true})
    comprobantes:Comprobante[];

}
