import { Colaborador } from '../../colaboradores/entities/colaborador.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Rol {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    descripcion: string;
    
    @OneToMany( () => Colaborador, (colaborador) => colaborador.rol)
    colaboradores?: Colaborador[];

}