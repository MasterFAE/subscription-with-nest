"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetCurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const req = context.switchToHttp().getRequest();
    req.user.id = parseInt(req.user.id);
    if (!data)
        return req.user;
    return req.user[data];
});
//# sourceMappingURL=current-user.decorator.js.map