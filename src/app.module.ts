import { LocationController } from './location/location.controller';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LocationModule } from './location/location.module';
import { CommentsModule } from './comments/comments.module';
import { ExternalSourcesModule } from './external-sources/external-sources.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LocationModule,
    CommentsModule,
    ExternalSourcesModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    LocationController,
  ],
  providers: [AppService],
})
export class AppModule {}
