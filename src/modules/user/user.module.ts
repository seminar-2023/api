import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledDate } from '../../entities/users/schedule-date.entity';
import { User } from '../../entities/users/user.entity';
import { GetUserController } from './controller/get-user.controller';
import { GetUserService } from './services/get-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ScheduledDate], 'develop')],
  controllers: [GetUserController],
  providers: [GetUserService],
})
export class UserModule {}
