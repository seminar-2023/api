import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicResponse } from '../../../@common/responses/basic-response.type';
import { detectIntent } from '../../../@common/services/dialogflow';
import { Answer } from '../../../entities/dialog/answer.entity';
import { Ask } from '../../../entities/dialog/ask.entity';

@Injectable()
export class AskService {
  constructor(
    @InjectRepository(Ask, 'develop')
    private readonly askRepository: Repository<Ask>,
    @InjectRepository(Answer, 'develop')
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async get(message: string): Promise<BasicResponse> {
    const sessionId = '1234';

    const responseDialogFlow = await detectIntent(message, sessionId);
    console.log(responseDialogFlow.queryResult.intent.displayName);
    console.log(responseDialogFlow.queryResult.parameters.fields);

    const intent = responseDialogFlow.queryResult.intent.displayName;

    let response;
    console.log(responseDialogFlow.queryResult);
    console.log(intent);

    if (intent.toLocaleLowerCase() === 'citas') {
      console.log(
        responseDialogFlow.queryResult.parameters.fields.date_type?.stringValue.toLocaleLowerCase(),
      );
      const answerResponsive = await this.answerRepository
        .createQueryBuilder('answer')
        .innerJoinAndSelect('answer.ask', 'ask')
        .where('ask.name=:name', {
          name: responseDialogFlow.queryResult.parameters.fields.date_type?.stringValue.toLocaleLowerCase(),
        })
        .getOne();

      console.log({ answerResponsive });

      response = {
        question: message,
        answer: answerResponsive?.text,
      };
    } else
      response = {
        question: message,
        answer: responseDialogFlow.queryResult.fulfillmentText,
      };

    return new BasicResponse(true, response, 'ASK_SOLVED');
  }
}
