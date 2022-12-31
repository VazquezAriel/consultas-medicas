import { Test, TestingModule } from '@nestjs/testing';
import { ComprobantesController } from './comprobantes.controller';
import { ComprobantesService } from './comprobantes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comprobante } from './entities/comprobante.entity';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { UpdateComprobanteDto } from './dto/update-comprobante.dto';

describe('ComprobantesController', () => {
  let controller: ComprobantesController;
  let comprobantesService: ComprobantesService;

  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComprobantesController],
      providers: [
        ComprobantesService,
        {
          provide: getRepositoryToken(Comprobante),
          useValue: mockRepository
        }
      ]
    })
    .compile();

    controller = module.get<ComprobantesController>(ComprobantesController);
    comprobantesService = module.get<ComprobantesService>(ComprobantesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getComprobantes', () => {
    it ('should return an array of comprobantes', async () => {
      jest.spyOn(comprobantesService, 'findAll').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Comprobante[]>)
      );
      const result = await controller.findAll();
      expect(result).toHaveLength(1);
      expect(comprobantesService.findAll).toHaveBeenCalledTimes(1);
    })
  })

  describe('createComprobante', () => {
    it ('should create a Comprobante', async () => {
      jest.spyOn(comprobantesService, 'create').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Comprobante>)
      );
      const rolCreated = await controller.create({example: 'example'} as unknown as CreateComprobanteDto);
      expect(rolCreated);
      expect(comprobantesService.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('updateComprobante', () => {
    it ('should update a Comprobante', async () => {
      jest.spyOn(comprobantesService, 'update').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Comprobante>)
      );
      const comprobanteUpdated = await controller.update('idExample', {name: 'example'} as unknown as UpdateComprobanteDto);
      expect(comprobanteUpdated);
      expect(comprobantesService.update).toHaveBeenCalledTimes(1);
    })
  })

  describe('deleteComprobante', () => {
    it ('should remove a Comprobante', async () => {
      jest.spyOn(comprobantesService, 'remove').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Comprobante>)
      );
      const comprobanteDeleted = await controller.remove('idExample');
      expect(comprobanteDeleted);
      expect(comprobantesService.remove).toHaveBeenCalledTimes(1);
    })
  })
});
