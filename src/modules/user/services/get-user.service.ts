import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledDate } from '../../../entities/users/schedule-date.entity';
import { User } from '../../../entities/users/user.entity';
import { BasicResponse } from '../../../@common/responses/basic-response.type';
import * as moment from 'moment';

@Injectable()
export class GetUserService {
  constructor(
    @InjectRepository(User, 'develop')
    private readonly userRepository: Repository<User>,
    @InjectRepository(ScheduledDate, 'develop')
    private readonly dateRepository: Repository<ScheduledDate>,
  ) {}

  async get(userId: string): Promise<BasicResponse> {
    const userExists = await this.userRepository.findOne({
      where: {
        nuip: userId,
      },
    });

    if (!userExists) throw new BadRequestException('NUIP_NOT_FOUND');

    const dates = await this.dateRepository.find({
      where: {
        user: {
          id: userExists.id,
        },
      },
    });

    const todayDates = dates.filter((date) =>
      moment(date.date).isSame(new Date(), 'day'),
    );

    const dateResume =
      `Para el día de hoy tiene las siguientes citas` +
      todayDates
        .map((date) => `${date.name} a las ${moment(date.date).format('hh a')}`)
        .join('. ');

    const response = {
      ...userExists,
      dates,
      dateResume:
        todayDates.length > 0 ? dateResume : 'No tienes citas para hoy',
    };

    return new BasicResponse(true, response, 'USER_FOUND');
  }
}
