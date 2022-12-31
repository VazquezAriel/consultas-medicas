import { Test, TestingModule } from '@nestjs/testing';
import { MedicosController } from './medicos.controller';
import { MedicosService } from './medicos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { EspecialidadesService } from '../especialidades/especialidades.service';
import { Especialidad } from '../especialidades/entities/especialidad.entity';

describe('MedicosController', () => {
  let controller: MedicosController;
  let medicosService:MedicosService;

  const mockRepository ={};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicosController],
      providers: [
        MedicosService,
        {
          provide: getRepositoryToken(Medico),
          useValue: mockRepository
        },
        EspecialidadesService,
        {
          provide: getRepositoryToken(Especialidad),
          useValue: mockRepository
        }
      ],
    }).compile();

    controller = module.get<MedicosController>(MedicosController);
    medicosService = module.get<MedicosService>(MedicosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMedicos', () => {
    it ('should return an array of medicos', async () => {
      jest.spyOn(medicosService, 'findAll').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<any[]>)
      );
      const result = await controller.findAll();
      expect(result).toHaveLength(1);
      expect(medicosService.findAll).toHaveBeenCalledTimes(1);
    })
  })

  describe('createMedico', () => {
    it ('should create a Medico', async () => {
      jest.spyOn(medicosService, 'create').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<any>)
      );
      const medicoCreated = await controller.create({example: 'example'} as unknown as CreateMedicoDto);
      expect(medicoCreated);
      expect(medicosService.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('updateMedico', () => {
    it ('should update a Medico', async () => {
      jest.spyOn(medicosService, 'update').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Medico>)
      );
      const medicoUpdated = await controller.update('idExample', {name: 'example'} as unknown as UpdateMedicoDto);
      expect(medicoUpdated);
      expect(medicosService.update).toHaveBeenCalledTimes(1);
    })
  })

  describe('deleteMedico', () => {
    it ('should remove a Medico', async () => {
      jest.spyOn(medicosService, 'remove').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<any>)
      );
      const medicoDeleted = await controller.remove('idExample');
      expect(medicoDeleted);
      expect(medicosService.remove).toHaveBeenCalledTimes(1);
    })
  })
});
