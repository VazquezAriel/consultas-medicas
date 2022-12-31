import { Test, TestingModule } from '@nestjs/testing';
import { TransaccionesController } from './transacciones.controller';
import { TransaccionesService } from './transacciones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaccion } from './entities/transaccion.entity';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';

describe('TransaccionesController', () => {
  let controller: TransaccionesController;
  let transaccionesService:TransaccionesService;

  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransaccionesController],
      providers: [
        TransaccionesService,
        {
          provide: getRepositoryToken(Transaccion),
          useValue: mockRepository
        }
      ]
    }).compile();

    controller = module.get<TransaccionesController>(TransaccionesController);
    transaccionesService = module.get<TransaccionesService>(TransaccionesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTransacciones', () => {
    it ('should return an array of transacciones', async () => {
      jest.spyOn(transaccionesService, 'findAll').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Transaccion[]>)
      );
      const result = await controller.findAll();
      expect(result).toHaveLength(1);
      expect(transaccionesService.findAll).toHaveBeenCalledTimes(1);
    })
  })

  describe('createTransaccion', () => {
    it ('should create a Transaccion', async () => {
      jest.spyOn(transaccionesService, 'create').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Transaccion>)
      );
      const transaccionCreated = await controller.create({example: 'example'} as unknown as CreateTransaccionDto);
      expect(transaccionCreated);
      expect(transaccionesService.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('updateTransaccion', () => {
    it ('should update a Transaccion', async () => {
      jest.spyOn(transaccionesService, 'update').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Transaccion>)
      );
      const transaccionUpdated = await controller.update('idExample', {name: 'example'} as unknown as UpdateTransaccionDto);
      expect(transaccionUpdated);
      expect(transaccionesService.update).toHaveBeenCalledTimes(1);
    })
  })

  describe('deleteTransaccion', () => {
    it ('should remove a Transaccion', async () => {
      jest.spyOn(transaccionesService, 'remove').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Transaccion>)
      );
      const transaccionDeleted = await controller.remove('idExample');
      expect(transaccionDeleted);
      expect(transaccionesService.remove).toHaveBeenCalledTimes(1);
    })
  })
});
