import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column('text')
    rol: string;

    //@BeforeInsert()
    

}
