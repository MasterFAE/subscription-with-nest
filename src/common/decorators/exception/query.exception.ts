import { HttpStatus } from '@nestjs/common';
import { IMPOSSIBLE_ACTION, NO_MATCH } from '.././constants';

export type ExceptionPayload = {
  message?: string;
  code?: number;
  data?: any;
  description?: string;
  log_description?: any;
};

export type GeneratedException = ExceptionPayload & Error;

export class QueryException extends Error {
  message: string;
  name: string;
  code: number;
  description: string;
  data: any;
  log_description: any;
  constructor(payload: ExceptionPayload) {
    super(payload.message);
    this.message = payload.message;
    this.name = payload.message;
    this.description = payload.description;
    this.log_description = payload.log_description;
    this.code = payload.code || HttpStatus.BAD_REQUEST;

    if (this.code != 500) this.data = payload.data;
    switch (payload.message) {
      case NO_MATCH:
        this.code = HttpStatus.NOT_FOUND;
        break;
      case IMPOSSIBLE_ACTION:
        this.code = HttpStatus.BAD_GATEWAY;
        break;
    }
  }
}
