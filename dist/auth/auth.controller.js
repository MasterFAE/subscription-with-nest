"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const prisma_exception_generator_1 = require("../common/decorators/exception/prisma-exception-generator");
const is_public_decorator_1 = require("../common/decorators/is-public.decorator");
const auth_service_1 = require("./auth.service");
const index_dto_1 = require("./dto/index.dto");
let AuthController = class AuthController {
    constructor(configService, authService) {
        this.configService = configService;
        this.authService = authService;
    }
    async logIn(req, res) {
        res.cookie('access_token', req.user.access_token, {
            httpOnly: true,
            maxAge: 3.154e10,
            sameSite: 'none',
        });
        res.cookie('refresh_token', req.user.refresh_token, {
            httpOnly: true,
            maxAge: 3.154e10,
            sameSite: 'none',
        });
        return req.user;
    }
    async register(body, res) {
        try {
            const result = await this.authService.register(body);
            res.cookie('access_token', result.access_token, {
                httpOnly: true,
                maxAge: 3.154e10,
                sameSite: 'none',
            });
            res.cookie('refresh_token', result.refresh_token, {
                httpOnly: true,
                maxAge: 3.154e10,
                sameSite: 'none',
            });
            return result;
        }
        catch (error) {
            let { code, message } = (0, prisma_exception_generator_1.default)(error);
            throw new common_1.HttpException(message, code);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, is_public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logIn", null);
__decorate([
    (0, is_public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_dto_1.RegisterDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map