import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicResponse } from '../../../@common/responses/basic-response.type';
import { Ask } from '../../../entities/dialog/ask.entity';

@Injectable()
export class AskService {
  constructor(
    @InjectRepository(Ask, 'develop')
    private readonly dateRepository: Repository<Ask>,
  ) {}

  async get(message: string): Promise<BasicResponse> {
    const intent = 'cita';

    let response;

    if (intent === 'cita')
      response = {
        question: message,
        answer:
          'Debes ingresar a la aplicación móvil y ver el video instructivo',
      };
    else
      response = {
        question: message,
        answer:
          'Debes ingresar a la aplicación móvil y ver el video instructivo',
      };

    return new BasicResponse(true, response, 'ASK_SOLVED');
  }
}
