import { Module } from '@nestjs/common';
import { UserLoginsService } from './user_logins.service';
import { UserLoginsController } from './user_logins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogin } from './entities/user_login.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserLogin])],
  providers: [UserLoginsService],
  controllers: [UserLoginsController],
  exports: [UserLoginsService],
})
export class UserLoginsModule {}
