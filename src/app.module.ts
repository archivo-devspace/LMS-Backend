import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import serveStatic from 'serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
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
