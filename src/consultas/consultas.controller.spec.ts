import { Test, TestingModule } from '@nestjs/testing';
import { ConsultasController } from './consultas.controller';
import { ConsultasService } from './consultas.service';
import { Consulta } from './entities/consulta.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

describe('ConsultasController', () => {
  let controller: ConsultasController;
  let consultasService: ConsultasService;

  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultasController],
      providers: [
        ConsultasService,
        {
          provide: getRepositoryToken(Consulta),
          useValue: mockRepository
        }
      ]
    }).compile();

    controller = module.get<ConsultasController>(ConsultasController);
    consultasService = module.get<ConsultasService>(ConsultasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getConsultas', () => {
    it ('should return an array of consultas', async () => {
      jest.spyOn(consultasService, 'findAll').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Consulta[]>)
      );

      const result = await controller.findAll();
      expect(result).toHaveLength(1);
      expect(consultasService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('createConsulta', () => {
    it ('should create a Consulta', async () => {
      jest.spyOn(consultasService, 'create').mockImplementation(() =>
        Promise.resolve([{example: 'example'}] as unknown as Promise<Consulta>)
      );

      const consultaCreated = await controller.create({example: 'example'} as unknown as CreateConsultaDto);
      expect(consultaCreated);
      expect(consultasService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateConsulta', () => {
    it ('should update a Consulta', async () => {
      jest.spyOn(consultasService, 'update').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Consulta>)
      );
      const consultaUpdated = await controller.update('idExample', {name: 'example'} as unknown as UpdateConsultaDto);
      expect(consultaUpdated);
      expect(consultasService.update).toHaveBeenCalledTimes(1);
    })
  })

  describe('deleteComprobante', () => {
    it ('should remove a Comprobante', async () => {
      jest.spyOn(consultasService, 'remove').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Consulta>)
      );
      const consultaDeleted = await controller.remove('idExample');
      expect(consultaDeleted);
      expect(consultasService.remove).toHaveBeenCalledTimes(1);
    })
  })

});
