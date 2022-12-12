import { Rol } from 'src/roles/entities/rol.entity';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Colaborador {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    cedula: string;

    @Column('text')
    nombres: string;

    @Column('text')
    apellidos: string;

    @Column('text', {default: 'NaN'})
    telefono: string;

    @Column('text', {default: 'NaN'})
    celular: string;

    @Column('text')
    direccion: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text')
    contrasenia: string;

    @ManyToOne( () => Rol, (rol) => rol.colaboradores, {nullable: false, eager:true})
    rol: Rol;

}
