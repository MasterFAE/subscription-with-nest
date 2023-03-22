import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth/auth.service';
import { JwtGuard } from './auth/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    JwtModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    AddressModule,
    OrderModule,
    SubscriptionModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
