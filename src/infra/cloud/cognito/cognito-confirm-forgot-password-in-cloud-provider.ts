import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment from './cognito-environment';
import { ConfirmForgotPasswordInCloudProvider } from '@/application/protocols/cloud/auth';
import { ConfirmForgotPasswordInCloudProviderError } from '@/application/errors/cloud/auth';

export class CognitoConfirmForgotPasswordInCloudProvider
  implements ConfirmForgotPasswordInCloudProvider
{
  private readonly cognitoInstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoInstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
      credentials: new aws.Credentials({
        accessKeyId: cognitoEnvironment.accessKeyId,
        secretAccessKey: cognitoEnvironment.secretAccessKey,
      }),
    });
  }

  async confirmForgotPassword(
    confirmParams: ConfirmForgotPasswordInCloudProvider.Params
  ): Promise<ConfirmForgotPasswordInCloudProvider.Result> {
    const { email, newPassword, verificationCode } = confirmParams;

    return new Promise<ConfirmForgotPasswordInCloudProvider.Result>(
      (resolve, reject) => {
        this.cognitoInstance.confirmForgotPassword(
          {
            ClientId: cognitoEnvironment.clientId,
            Username: email,
            Password: newPassword,
            ConfirmationCode: verificationCode,
          },
          (err, data) => {
            if (err) {
              return reject(
                new ConfirmForgotPasswordInCloudProviderError(err.message)
              );
            }

            resolve();
          }
        );
      }
    );
  }
}
