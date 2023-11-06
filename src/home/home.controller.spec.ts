import { Test, TestingModule } from '@nestjs/testing';
import { HomeModule } from './home.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('HomeController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HomeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/home (GET)', () => {
    return request(app.getHttpServer())
      .get('/home')
      .expect(200)
      .expect(({ body }) => {
        expect(body.health).toBe('OK');
      });
  });
});
