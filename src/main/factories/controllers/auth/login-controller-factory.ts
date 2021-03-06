import { Controller } from '@/presentation/http/protocols';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeLoginCloudService } from '@/main/factories/services/auth';
import { makeLoginValidation } from '@/main/factories/validation/auth';
import { LoginController } from '@/presentation/http/controllers/auth';

export const makeLoginController = (): Controller => {
  const loginUsecase = makeLoginCloudService();

  const validation = makeLoginValidation();

  const loginController = new LoginController(validation, loginUsecase);

  const loginControllerWithLogDecorator =
    makeLogControllerDecorator(loginController);

  return loginControllerWithLogDecorator;
};
