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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AddressService = class AddressService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createAddressDto) {
        return await this.prisma.address.create({
            data: Object.assign(Object.assign({}, createAddressDto), { user: { connect: { id: userId } } }),
        });
    }
    async findAll(userId) {
        return await this.prisma.address.findMany({ where: { userId } });
    }
    async findOne(userId, id) {
        return await this.prisma.address.findFirst({ where: { id, userId } });
    }
    async update(userId, id, updateAddressDto) {
        const { city, zip, country, description, state, street, type } = updateAddressDto;
        return await this.prisma.address.update({
            where: { userId_id: { userId, id } },
            data: {
                city: city || undefined,
                zip: zip || undefined,
                country: country || undefined,
                description: description || undefined,
                state: state || undefined,
                street: street || undefined,
                type: type || undefined,
            },
        });
    }
    async remove(userId, id) {
        return await this.prisma.address.delete({
            where: { userId_id: { userId, id } },
        });
    }
};
AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map