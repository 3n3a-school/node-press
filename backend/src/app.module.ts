import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { PostsModule } from './posts/posts.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';

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
  }), PostsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule {}
