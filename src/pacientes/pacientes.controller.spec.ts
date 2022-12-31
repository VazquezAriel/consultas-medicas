import { Test, TestingModule } from '@nestjs/testing';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

describe('PacientesController', () => {
  let controller: PacientesController;
  let pacientesService: PacientesService;

  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacientesController],
      providers: [
        PacientesService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: mockRepository
        }
      ]
    }).compile();

    controller = module.get<PacientesController>(PacientesController);
    pacientesService = module.get<PacientesService>(PacientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPacientes', () => {
    it ('should return an array of pacientes', async () => {
      jest.spyOn(pacientesService, 'findAll').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Paciente[]>)
      );
      const result = await controller.findAll();
      expect(result).toHaveLength(1);
      expect(pacientesService.findAll).toHaveBeenCalledTimes(1);
    })
  })

  describe('createPaciente', () => {
    it ('should create a Comprobante', async () => {
      jest.spyOn(pacientesService, 'create').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Paciente>)
      );
      const pacienteCreated = await controller.create({example: 'example'} as unknown as CreatePacienteDto);
      expect(pacienteCreated);
      expect(pacientesService.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('updatePaciente', () => {
    it ('should update a Paciente', async () => {
      jest.spyOn(pacientesService, 'update').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Paciente>)
      );
      const pacienteUpdated = await controller.update('idExample', {name: 'example'} as unknown as UpdatePacienteDto);
      expect(pacienteUpdated);
      expect(pacientesService.update).toHaveBeenCalledTimes(1);
    })
  })

  describe('deletePaciente', () => {
    it ('should remove a Paciente', async () => {
      jest.spyOn(pacientesService, 'remove').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Paciente>)
      );
      const pacienteteUpdated = await controller.remove('idExample');
      expect(pacienteteUpdated);
      expect(pacientesService.remove).toHaveBeenCalledTimes(1);
    })
  })
});
