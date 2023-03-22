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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, configService, jwtService) {
        this.prisma = prisma;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async login({ email, password }) {
        const user = await this.prisma.user.findFirstOrThrow({
            where: { email },
            select: { id: true, email: true, password: true },
        });
        const result = await argon.verify(user.password, password);
        if (!result)
            return null;
        const tokens = await this.updateTokens(user);
        return Object.assign(Object.assign({}, user), tokens);
    }
    async register(data) {
        let hashPassword = await argon.hash(data.password);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
            },
        });
        const tokens = await this.updateTokens(user);
        return Object.assign(Object.assign({}, user), tokens);
    }
    async updateTokens(user) {
        let tokens = await this.generateTokens({
            id: user.id,
            email: user.email,
        });
        let hashRefreshToken = await argon.hash(tokens.refresh_token);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: hashRefreshToken, lastLogin: new Date() },
        });
        return Object.assign({}, tokens);
    }
    async generateTokens(payload) {
        let access_token = await this.jwtService.signAsync({
            id: payload.id,
            email: payload.email,
        }, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_TOKEN_EXPIRE_DATE'),
        });
        let refresh_token = await this.jwtService.signAsync({ id: payload.id, email: payload.email }, {
            secret: this.configService.get('REFRESH_SECRET'),
            expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRE_DATE'),
        });
        return { access_token, refresh_token };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map