import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { BasicResponse } from '../../../@common/responses/basic-response.type';
import { GetUserService } from '../services/get-user.service';

@ApiTags('User')
@Controller('user')
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get('/:id')
  @ApiParam({ name: 'id' })
  async get(@Param() params): Promise<BasicResponse> {
    return this.getUserService.get(params.id);
  }
}
