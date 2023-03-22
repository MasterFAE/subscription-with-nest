"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require(".././constants");
class QueryException extends Error {
    constructor(payload) {
        super(payload.message);
        this.message = payload.message;
        this.name = payload.message;
        this.description = payload.description;
        this.log_description = payload.log_description;
        this.code = payload.code || common_1.HttpStatus.BAD_REQUEST;
        if (this.code != 500)
            this.data = payload.data;
        switch (payload.message) {
            case constants_1.NO_MATCH:
                this.code = common_1.HttpStatus.NOT_FOUND;
                break;
            case constants_1.IMPOSSIBLE_ACTION:
                this.code = common_1.HttpStatus.BAD_GATEWAY;
                break;
        }
    }
}
exports.QueryException = QueryException;
//# sourceMappingURL=query.exception.js.map