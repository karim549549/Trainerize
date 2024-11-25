import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from '../prisma/PrismaService/prisma.module';
import { SubscriptionTierModule } from './subscription-tier/subscription-tier.module';

@Module({
  imports: [PrismaModule,   SubscriptionTierModule , ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
