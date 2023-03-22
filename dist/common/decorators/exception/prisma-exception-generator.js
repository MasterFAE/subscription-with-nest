"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const prismaGenerateException = (error) => {
    let er = { code: null, description: null, message: null };
    switch (error.code) {
        case 'P2000':
            er.code = common_1.HttpStatus.BAD_REQUEST;
            er.message = constants_1.INVALID_CREDENTIAL;
            er.description =
                "The provided value for the column is too long for the column's type";
            break;
        case 'P2001':
            er.code = common_1.HttpStatus.BAD_REQUEST;
            er.message = constants_1.NO_MATCH;
            er.description = constants_1.NO_MATCH;
            break;
        case 'P2025':
            er.code = common_1.HttpStatus.BAD_REQUEST;
            er.message = constants_1.NO_MATCH;
            er.description = 'Invalid target';
            break;
        case 'P2002':
            er.code = common_1.HttpStatus.BAD_REQUEST;
            er.message = constants_1.ALREADY_EXISTS;
            er.description = constants_1.ALREADY_EXISTS;
            break;
        case 'P2003':
            er.code = common_1.HttpStatus.BAD_REQUEST;
            er.message = constants_1.IMPOSSIBLE_ACTION;
            er.description =
                "The provided value for the column is too long for the column's type";
            break;
        case 'P2010':
            er.code = common_1.HttpStatus.BAD_REQUEST;
            er.message = constants_1.SERVER_ERROR;
            er.description = constants_1.SERVER_ERROR;
            break;
        case 'P2025':
            er.code = common_1.HttpStatus.BAD_REQUEST;
            er.message = constants_1.NO_MATCH;
            break;
        default:
            er.code = common_1.HttpStatus.BAD_REQUEST;
            er.message = constants_1.SERVER_ERROR;
            er.description = constants_1.SERVER_ERROR;
            break;
    }
    return er;
};
exports.default = prismaGenerateException;
//# sourceMappingURL=prisma-exception-generator.js.map