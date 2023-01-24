import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComprobantesModule } from './comprobantes/comprobantes.module';
import { ColaboradoresModule } from './colaboradores/colaboradores.module';
import { RolesModule } from './roles/roles.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { ConsultasModule } from './consultas/consultas.module';
import { CitasModule } from './citas/citas.module';
import { TransaccionesModule } from './transacciones/transacciones.module';
import postgres from 'postgres';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'consultas-medicasDB',
        username: 'postgres',
        password: 'root',
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    ComprobantesModule,
    ColaboradoresModule,
    RolesModule,
    PacientesModule,
    MedicosModule,
    EspecialidadesModule,
    ConsultasModule,
    CitasModule,
    TransaccionesModule
    
  ],
})
export class AppModule {}
