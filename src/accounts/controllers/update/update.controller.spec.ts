import { LoggerService } from '@icc-dev/icc-log-service';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { UpdateController } from './update.controller';
import { AccountsMockService } from '@accounts/services/accounts/accounts.mock.service';
import { UpdateAccountDto } from '@accounts/dto/update-account.dto';
import { NOT_FOUND_UPDATE_ACCOUNT_DTO, MISSING_CREATE_ACCOUNT_DTO, VALID_UPDATE_ACCOUNT_DTO } from '@accounts/services/mock/accounts.mock';

describe('UpdateController', () => {
  let controller: UpdateController;
  let logger: LoggerService;
  let accountSrvc: AccountsService;
  let response: any;

  let loggerService = { 
    log: (message: string, additionalData: any) => {},
    error: (message: string, additionalData: any) => {},
    warn: (message: string, additionalData: any) => {},
  };

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateController],
      providers: [
        AccountsService,
        {
          provide: LoggerService,
          useValue: loggerService
        },
      ],
    }).overrideProvider(AccountsService)
    .useClass(AccountsMockService)
    .compile();

    controller = module.get<UpdateController>(UpdateController);
    logger = await module.resolve<LoggerService>(LoggerService);
    accountSrvc = await module.resolve<AccountsService>(AccountsService);
    response = mockResponse();
  })

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('logger service should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('accountSrvc service should be defined', () => {
    expect(accountSrvc).toBeDefined();
  });

  describe('422 Unprocessable Entity', () => {
    it('should be return 422 empty body', async () => {
      await controller.updateAccount(
        response,
        {} as unknown as UpdateAccountDto
      );
      expect(response.status).toHaveBeenCalledWith(422);
    });
    it('should be return 422 null body', async () => {
      await controller.updateAccount(
        response,
        null
      );
      expect(response.status).toHaveBeenCalledWith(422);
    });
  });


  describe('500 Internal Server Error', () => {
    it('should be return 500 exists user', async () => {
      await controller.updateAccount(
        response,
        NOT_FOUND_UPDATE_ACCOUNT_DTO as UpdateAccountDto
      );
      expect(response.status).toHaveBeenCalledWith(500);
    });
    it('should be return 500 missing accountType', async () => {
      await controller.updateAccount(
        response,
        MISSING_CREATE_ACCOUNT_DTO as UpdateAccountDto
      );
      console.log(JSON.stringify(response.json))
      expect(response.status).toHaveBeenCalledWith(500);
    });
  });

  describe('200 Updated', () => {
    it('should be return 200 with body', async () => {
      await controller.updateAccount(
        response,
        VALID_UPDATE_ACCOUNT_DTO as UpdateAccountDto
      );
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

});
