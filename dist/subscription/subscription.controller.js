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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const prisma_exception_generator_1 = require("../common/decorators/exception/prisma-exception-generator");
const index_dto_1 = require("./dto/index.dto");
const subscription_service_1 = require("./subscription.service");
let SubscriptionController = class SubscriptionController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    async create(userId) {
        try {
            return await this.subscriptionService.create(userId);
        }
        catch (error) {
            let { code, message } = (0, prisma_exception_generator_1.default)(error);
            throw new common_1.HttpException(message, code);
        }
    }
    async findOne(userId, id) {
        try {
            return await this.subscriptionService.find(userId, id);
        }
        catch (error) {
            let { code, message } = (0, prisma_exception_generator_1.default)(error);
            throw new common_1.HttpException(message, code);
        }
    }
    async updateStatus(userId, id, { status }) {
        try {
            return await this.subscriptionService.updateStatus(userId, id, status);
        }
        catch (error) {
            let { code, message } = (0, prisma_exception_generator_1.default)(error);
            throw new common_1.HttpException(message, code);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.GetCurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, current_user_decorator_1.GetCurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, current_user_decorator_1.GetCurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, index_dto_1.UpdateSubscriptionDto]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateStatus", null);
SubscriptionController = __decorate([
    (0, common_1.Controller)('subscription'),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], SubscriptionController);
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=subscription.controller.js.map