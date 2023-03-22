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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const prisma_exception_generator_1 = require("../common/decorators/exception/prisma-exception-generator");
const address_service_1 = require("./address.service");
const index_dto_1 = require("./dto/index.dto");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async create(userId, createAddressDto) {
        try {
            return await this.addressService.create(userId, createAddressDto);
        }
        catch (error) {
            let { code, message } = (0, prisma_exception_generator_1.default)(error);
            throw new common_1.HttpException(message, code);
        }
    }
    async findAll(userId) {
        try {
            return await this.addressService.findAll(userId);
        }
        catch (error) {
            let { code, message } = (0, prisma_exception_generator_1.default)(error);
            throw new common_1.HttpException(message, code);
        }
    }
    async findOne(userId, id) {
        try {
            return await this.addressService.findOne(userId, id);
        }
        catch (error) {
            let { code, message } = (0, prisma_exception_generator_1.default)(error);
            throw new common_1.HttpException(message, code);
        }
    }
    async update(userId, id, updateAddressDto) {
        try {
            return await this.addressService.update(userId, id, updateAddressDto);
        }
        catch (error) {
            let { code, message } = (0, prisma_exception_generator_1.default)(error);
            throw new common_1.HttpException(message, code);
        }
    }
    remove(userId, id) {
        try {
            return this.addressService.remove(userId, id);
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
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, index_dto_1.CreateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.GetCurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, current_user_decorator_1.GetCurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, current_user_decorator_1.GetCurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, index_dto_1.UpdateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, current_user_decorator_1.GetCurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "remove", null);
AddressController = __decorate([
    (0, common_1.Controller)('address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map