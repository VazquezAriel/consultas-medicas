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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
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
