import { Module } from '@nestjs/common';
import { SubscriptionTierService } from './subscription-tier.service';
import { SubscriptionTierController } from './subscription-tier.controller';

@Module({
  controllers: [SubscriptionTierController],
  providers: [SubscriptionTierService],
})
export class SubscriptionTierModule {}
