import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BasicResponse } from '../../../@common/responses/basic-response.type';
import { AskService } from '../services/ask.service';

@ApiTags('Ask')
@Controller('ask')
export class AskController {
  constructor(private readonly askService: AskService) {}

  @Get('')
  @ApiQuery({ name: 'question' })
  async get(@Query('question') question: string): Promise<BasicResponse> {
    return this.askService.get(question);
  }
}
