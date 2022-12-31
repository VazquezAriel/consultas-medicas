import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { RolesController } from './roles.controller';
import { RolesModule } from './roles.module';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';

describe('RolesController', () => {

  let controller: RolesController;
  let rolesService: RolesService;

  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Rol),
          useValue: mockRepository
        }
      ],
    }).compile()

    controller = module.get<RolesController>(RolesController);
    rolesService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRoles', () => {
    it ('should return an array of roles', async () => {
      jest.spyOn(rolesService, 'findAll').mockImplementation(() =>
        Promise.resolve([{name: 'example'}] as unknown as Promise<Rol[]>)
      );

      const result = await controller.findAll();
      expect(result).toHaveLength(1);
      expect(rolesService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('createRol', () => {
    it ('should create a Rol', async () => {
      jest.spyOn(rolesService, 'create').mockImplementation(() =>
        Promise.resolve([{descripcion: 'example'}] as unknown as Promise<Rol>)
      );

      const rolCreated = await controller.create({descripcion: 'example'} as unknown as CreateRolDto);
      expect(rolCreated);
      expect(rolesService.create).toHaveBeenCalledTimes(1);
    });
  });

});
