import { Test, TestingModule } from '@nestjs/testing';
import { ColaboradoresController } from './colaboradores.controller';
import { ColaboradoresService } from './colaboradores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { RolesService } from '../roles/roles.service';
import { Rol } from '../roles/entities/rol.entity';

describe('ColaboradoresController', () => {
  let controller: ColaboradoresController;
  let colaboradoresService;

  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColaboradoresController],
      providers:[
        ColaboradoresService,
        {
          provide: getRepositoryToken(Colaborador),
          useValue: mockRepository
        },
        RolesService,
        {
          provide: getRepositoryToken(Rol),
          useValue: mockRepository
        }
      ]
    }).compile();

    controller = module.get<ColaboradoresController>(ColaboradoresController);
    colaboradoresService = module.get<ColaboradoresService>(ColaboradoresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getColaboradores', () => {
    it ('should return an array of colaboradores', async () => {
      jest.spyOn(colaboradoresService, 'findAll').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Colaborador[]>)
      );
      const result = await controller.findAll();
      expect(result).toHaveLength(1);
      expect(colaboradoresService.findAll).toHaveBeenCalledTimes(1);
    })
  })

  describe('createColaborador', () => {
    it ('should create a Colaborador', async () => {
      jest.spyOn(colaboradoresService, 'create').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Colaborador>)
      );
      const colaboradorCreated = await controller.create({example: 'example'} as unknown as CreateColaboradorDto);
      expect(colaboradorCreated);
      expect(colaboradoresService.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('updateColaborador', () => {
    it ('should update a Colaborador', async () => {
      jest.spyOn(colaboradoresService, 'update').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Colaborador>)
      );
      const colaboradorUpdated = await controller.update('idExample', {name: 'example'} as unknown as UpdateColaboradorDto);
      expect(colaboradorUpdated);
      expect(colaboradoresService.update).toHaveBeenCalledTimes(1);
    })
  })

  describe('deleteColaborador', () => {
    it ('should remove a Colaborador', async () => {
      jest.spyOn(colaboradoresService, 'remove').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Colaborador>)
      );
      const colaboradorDeleted = await controller.remove('idExample');
      expect(colaboradorDeleted);
      expect(colaboradoresService.remove).toHaveBeenCalledTimes(1);
    })
  })
});
