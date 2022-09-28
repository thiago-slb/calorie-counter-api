import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/services/user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mocks = {
    loginSuccess: { access_token: 'asdasd' },
    loginError: { message: 'email_or_password_wrong' },
  };

  const mockedService = {
    login: jest.fn((email, password) => {
      if (!email || !password) {
        return Promise.resolve(mocks.loginError);
      }
      return Promise.resolve(mocks.loginSuccess);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: mockedService,
        },
        {
          provide: AuthService,
          useValue: mockedService,
        },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a message if valid email and password', async () => {
    const loginResult = await service.login('test@test.com', '123123');
    expect(loginResult).toMatchObject(mocks.loginSuccess);
  });

  it('should return a message if invalid email or password', async () => {
    const loginResult = await service.login('', '');
    expect(loginResult).toMatchObject(mocks.loginError);
  });
});
