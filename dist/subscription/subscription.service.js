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
var SubscriptionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const dist_1 = require("@nestjs/schedule/dist");
const client_1 = require("@prisma/client");
const constants_1 = require("../common/decorators/constants");
const query_exception_1 = require("../common/decorators/exception/query.exception");
const order_service_1 = require("../order/order.service");
const prisma_service_1 = require("../prisma/prisma.service");
let SubscriptionService = SubscriptionService_1 = class SubscriptionService {
    constructor(prisma, orderService) {
        this.prisma = prisma;
        this.orderService = orderService;
        this.logger = new common_1.Logger(SubscriptionService_1.name);
    }
    async checkSubscriptionDate() {
        const subscriptions = await this.prisma.subscription.findMany({
            where: {
                status: client_1.SubscriptionStatus.ACTIVE,
                nextRenewal: { lte: new Date() },
            },
            include: {
                user: {
                    select: {
                        address: {
                            select: {
                                id: true,
                                type: true,
                            },
                        },
                    },
                },
            },
        });
        for (const subscription of subscriptions) {
            let address = subscription.user.address.find((e) => e.type == client_1.AddressType.PRIMARY) ||
                subscription.user.address[0];
            if (!address) {
                await this.prisma.subscription.update({
                    where: { id: subscription.id },
                    data: {
                        status: client_1.SubscriptionStatus.CANCELLED,
                    },
                });
                continue;
            }
            this.logger.log('Renewing subscription for user: ' + subscription.userId + '');
            const [,] = await Promise.all([
                this.prisma.subscription.update({
                    where: { id: subscription.id },
                    data: {
                        status: client_1.SubscriptionStatus.WAITING_FOR_PAYMENT,
                    },
                }),
                this.orderService.create(subscription.userId, {
                    addressId: address.id,
                    orderTotal: subscription.price,
                    subscriptionId: subscription.id,
                }),
            ]).catch((e) => {
                this.logger.error('An error occured while renewing a subscription');
                this.logger.error(e);
                return [null, null];
            });
        }
    }
    async create(userId) {
        const [subscription, address] = await Promise.all([
            this.prisma.subscription.findUnique({
                where: { userId },
            }),
            this.prisma.address.findMany({
                where: { userId },
            }),
        ]);
        if (!address)
            throw new query_exception_1.QueryException({
                message: constants_1.NO_MATCH,
                description: 'No address found for this user',
                code: 404,
            });
        let userAddress = address.find((e) => e.type == client_1.AddressType.PRIMARY) || address[0];
        let newSubscription;
        if (!subscription) {
            newSubscription = await this.prisma.subscription.create({
                data: {
                    user: { connect: { id: userId } },
                    price: constants_1.SUBSCRIPTION_PRICE,
                    status: client_1.SubscriptionStatus.WAITING_FOR_PAYMENT,
                    nextRenewal: new Date(Date.now() + constants_1.SUBSCRIPTION_DURATION * 24 * 60 * 60 * 1000),
                },
            });
        }
        else if (subscription.status == client_1.SubscriptionStatus.ACTIVE) {
            throw new query_exception_1.QueryException({
                message: constants_1.IMPOSSIBLE_ACTION,
                description: 'User already has an active subscription',
                code: 400,
            });
        }
        else if (subscription.status == client_1.SubscriptionStatus.WAITING_FOR_PAYMENT) {
            throw new query_exception_1.QueryException({
                message: constants_1.IMPOSSIBLE_ACTION,
                description: 'User already has a pending subscription',
                code: 400,
            });
        }
        else {
            newSubscription = await this.prisma.subscription.update({
                where: { id: subscription.id },
                data: {
                    price: constants_1.SUBSCRIPTION_PRICE,
                    status: client_1.SubscriptionStatus.WAITING_FOR_PAYMENT,
                    nextRenewal: new Date(Date.now() + constants_1.SUBSCRIPTION_DURATION * 24 * 60 * 60 * 1000),
                },
            });
        }
        try {
            const order = await this.orderService.create(userId, {
                orderTotal: newSubscription.price,
                addressId: userAddress.id,
                subscriptionId: newSubscription.id,
            });
            return { order, newSubscription };
        }
        catch (error) {
            throw new query_exception_1.QueryException({
                message: constants_1.SERVER_ERROR,
                description: 'Error while creating order',
                code: 500,
            });
        }
    }
    async find(userId, id) {
        return await this.prisma.subscription.findFirst({
            where: { userId, id },
        });
    }
    async updateStatus(userId, id, status) {
        return await this.prisma.subscription.update({
            where: { userId_id: { userId, id } },
            data: { status },
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(dist_1.CronExpression.EVERY_DAY_AT_1AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionService.prototype, "checkSubscriptionDate", null);
SubscriptionService = SubscriptionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        order_service_1.OrderService])
], SubscriptionService);
exports.SubscriptionService = SubscriptionService;
//# sourceMappingURL=subscription.service.js.map