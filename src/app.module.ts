import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
     isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/**'],
    }),
        UsersModule,
    PrismaModule,
     JwtModule.register({
      global: true
    }),
     PostModule,
     CategoryModule,
 
  ],
  controllers: [AppController],
  providers: [AppService, {
     provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule {}
