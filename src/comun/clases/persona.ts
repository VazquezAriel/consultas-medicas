import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Persona {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    cedula: string;

    @Column('text')
    nombres: string;

    @Column('text')
    apellidos: string;

    @Column('text')
    direccion: string;

    @Column('text', {default: 'NaN'})
    telefono: string;

    @Column('text', {default: 'NaN'})
    celular: string;

    @Column('text', {unique: true})
    email: string;

}
