import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../../entities/dialog/answer.entity';
import { Ask } from '../../entities/dialog/ask.entity';
import { AskController } from './controllers/ask.controller';
import { AskService } from './services/ask.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ask, Answer], 'develop')],
  controllers: [AskController],
  providers: [AskService],
})
export class AskModule {}
