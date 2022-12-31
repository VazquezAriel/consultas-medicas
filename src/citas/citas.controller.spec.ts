import { Test, TestingModule } from '@nestjs/testing';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { PacientesService } from '../pacientes/pacientes.service';
import { Paciente } from '../pacientes/entities/paciente.entity';

describe('CitasController', () => {
  let controller: CitasController;
  let citasService;

  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitasController],
      providers: [
        CitasService,
        {
          provide: getRepositoryToken(Cita),
          useValue: mockRepository
        },
        PacientesService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: mockRepository
        }
      ]
    }).compile();

    controller = module.get<CitasController>(CitasController);
    citasService = module.get<CitasService>(CitasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCitas', () => {
    it ('should return an array of citas', async () => {
      jest.spyOn(citasService, 'findAll').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Cita[]>)
      );
      const result = await controller.findAll();
      expect(result).toHaveLength(1);
      expect(citasService.findAll).toHaveBeenCalledTimes(1);
    })
  })

  describe('createCita', () => {
    it ('should create a Cita', async () => {
      jest.spyOn(citasService, 'create').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Cita>)
      );
      const citaCreated = await controller.create({example: 'example'} as unknown as CreateCitaDto);
      expect(citaCreated);
      expect(citasService.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('updateCita', () => {
    it ('should update a Cita', async () => {
      jest.spyOn(citasService, 'update').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Cita>)
      );
      const citaUpdated = await controller.update('idExample', {name: 'example'} as unknown as UpdateCitaDto);
      expect(citaUpdated);
      expect(citasService.update).toHaveBeenCalledTimes(1);
    })
  })

  describe('deleteCita', () => {
    it ('should remove a Cita', async () => {
      jest.spyOn(citasService, 'remove').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Cita>)
      );
      const citaDeleted= await controller.remove('idExample');
      expect(citaDeleted);
      expect(citasService.remove).toHaveBeenCalledTimes(1);
    })
  })
});
