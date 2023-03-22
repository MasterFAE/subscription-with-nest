import { SubscriptionStatus } from '@prisma/client';
import { IsIn } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsIn([SubscriptionStatus.CANCELLED])
  status;
}
