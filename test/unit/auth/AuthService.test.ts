import { Request } from 'express';
import MockExpressRequest from 'mock-express-request';
import { SampleUser } from 'src/api/models/SampleUser';

import { AuthService } from '../../../src/auth/AuthService';
import { LogMock } from '../lib/LogMock';
import { RepositoryMock } from '../lib/RepositoryMock';

describe('AuthService', () => {

  let authService: AuthService;
  let userRepository: RepositoryMock<SampleUser>;
  let log: LogMock;
  beforeEach(() => {
    log = new LogMock();
    userRepository = new RepositoryMock<SampleUser>();
    authService = new AuthService(log, userRepository as any);
  });

  describe('parseTokenFromRequest', () => {
    test('Should return the credentials of the basic authorization header', () => {
      const base64 = Buffer.from(`bruce:1234`).toString('base64');
      const req: Request = new MockExpressRequest({
        headers: {
          Authorization: `Basic ${base64}`,
        },
      });
      const credentials = authService.parseBasicAuthFromRequest(req);
      expect(credentials.username).toBe('bruce');
      expect(credentials.password).toBe('1234');
    });

    test('Should return undefined if there is no basic authorization header', () => {
      const req: Request = new MockExpressRequest({
        headers: {},
      });
      const token = authService.parseBasicAuthFromRequest(req);
      expect(token).toBeUndefined();
      expect(log.infoMock).toBeCalledWith('No credentials provided by the client', []);
    });

    test('Should return undefined if there is a invalid basic authorization header', () => {
      const req: Request = new MockExpressRequest({
        headers: {
          Authorization: 'Basic 1234',
        },
      });
      const token = authService.parseBasicAuthFromRequest(req);
      expect(token).toBeUndefined();
      expect(log.infoMock).toBeCalledWith('No credentials provided by the client', []);
    });

  });

});
