import { HttpStatus } from '@nestjs/common';
import {
  INVALID_CREDENTIAL,
  NO_MATCH,
  ALREADY_EXISTS,
  IMPOSSIBLE_ACTION,
  SERVER_ERROR,
} from '../constants';

const prismaGenerateException = (error) => {
  let er = { code: null, description: null, message: null };
  // These are the unique error codes that prisma can throw

  switch (error.code) {
    case 'P2000':
      er.code = HttpStatus.BAD_REQUEST;
      er.message = INVALID_CREDENTIAL;
      er.description =
        "The provided value for the column is too long for the column's type";
      break;
    case 'P2001':
      er.code = HttpStatus.BAD_REQUEST;
      er.message = NO_MATCH;
      er.description = NO_MATCH;
      break;
    case 'P2025':
      er.code = HttpStatus.BAD_REQUEST;
      er.message = NO_MATCH;
      er.description = 'Invalid target';
      break;
    case 'P2002':
      er.code = HttpStatus.BAD_REQUEST;
      er.message = ALREADY_EXISTS;
      er.description = ALREADY_EXISTS;
      break;
    case 'P2003':
      er.code = HttpStatus.BAD_REQUEST;
      er.message = IMPOSSIBLE_ACTION;
      er.description =
        "The provided value for the column is too long for the column's type";
      break;
    case 'P2010':
      er.code = HttpStatus.BAD_REQUEST;
      er.message = SERVER_ERROR;
      er.description = SERVER_ERROR;
      break;
    case 'P2025':
      er.code = HttpStatus.BAD_REQUEST;
      er.message = NO_MATCH;
      break;
    default:
      er.code = HttpStatus.BAD_REQUEST;
      er.message = SERVER_ERROR;
      er.description = SERVER_ERROR;
      break;
  }

  return er;
};
export default prismaGenerateException;
