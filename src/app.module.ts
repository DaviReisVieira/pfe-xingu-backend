import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UserLoginsModule } from './user_logins/user_logins.module';
import { RolesModule } from './roles/roles.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    HomeModule,
    AuthModule,
    UserLoginsModule,
    RolesModule,
  ],
})
export class AppModule {}
