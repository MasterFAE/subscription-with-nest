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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const constants_1 = require("../common/decorators/constants");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createOrderDto) {
        return await this.prisma.order.create({
            data: {
                address: { connect: { id: createOrderDto.addressId } },
                orderItem: { connect: { id: createOrderDto.subscriptionId } },
                user: { connect: { id: userId } },
                orderTotal: createOrderDto.orderTotal,
            },
        });
    }
    async payForOrder(userId, id) {
        return await this.prisma.order.update({
            where: {
                userId_id: { userId, id },
            },
            data: {
                status: client_1.OrderStatus.COMPLETED,
                orderItem: {
                    update: {
                        status: client_1.SubscriptionStatus.ACTIVE,
                        nextRenewal: new Date(Date.now() + constants_1.SUBSCRIPTION_DURATION * 24 * 60 * 60 * 1000),
                        lastRenewal: new Date(Date.now()),
                    },
                },
            },
        });
    }
    async findAll(userId) {
        return await this.prisma.order.findMany({ where: { userId } });
    }
    async findOne(userId, id) {
        return await this.prisma.order.findFirst({ where: { userId, id } });
    }
    async remove(userId, id) {
        return await this.prisma.order.update({
            where: { userId_id_status: { userId, id, status: client_1.OrderStatus.PENDING } },
            data: {
                status: client_1.OrderStatus.CANCELLED,
                orderItem: { update: { status: client_1.SubscriptionStatus.CANCELLED } },
            },
        });
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map