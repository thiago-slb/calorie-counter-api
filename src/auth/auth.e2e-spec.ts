import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthService } from './services/auth.service';
import * as request from 'supertest';

describe('Auth', () => {
  let app: INestApplication;
  const authService = { login: () => ['teste'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(AuthService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST auth/login`, () => {
    return request(app.getHttpServer()).post('/auth/login').expect(200).expect({
      data: authService.login(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
