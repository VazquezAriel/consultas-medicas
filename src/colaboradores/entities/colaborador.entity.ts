import { Rol } from '../../roles/entities/rol.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Persona } from '../../comun/clases/persona';

@Entity()
export class Colaborador extends Persona {

    @Column('text')
    contrasenia: string;

    @ManyToOne( () => Rol, (rol) => rol.colaboradores, {nullable: false, eager:true})
    rol: Rol;

}
