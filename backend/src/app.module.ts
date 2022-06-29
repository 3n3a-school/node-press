import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';

@Module({
  imports: [AuthModule, UsersModule, SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 2345,
    username: 'nodepress',
    password: 'nodepress',
    database: 'nodepress',
    autoLoadModels: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
