import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Especialidad {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    descripcion: string;
}
