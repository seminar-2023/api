import { ApiProperty } from '@nestjs/swagger';

export class BasicResponse {
  @ApiProperty({ description: 'Was a successful response' })
  success?: boolean;

  @ApiProperty({ description: 'Data about request' })
  detail?: any;

  @ApiProperty({ description: 'Code info about response status' })
  message?: string;

  constructor(success?, detail?, message?) {
    this.success = success;
    this.detail = detail;
    this.message = message;
  }
}
