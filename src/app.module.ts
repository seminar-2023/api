import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './@common/common.module';
import { InstanceConfigService } from './@common/config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AskModule } from './modules/ask/ask.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(InstanceConfigService.orm_config.develop),
    CommonModule,
    UserModule,
    AskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
