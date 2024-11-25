import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService/prisma.service'; 
import { CreateSubscriptionTierDto } from './dto/create-subscription-tier.dto';
import { UpdateSubscriptionTierDto } from './dto/update-subscription-tier.dto';
import { SubscriptionTier } from '@prisma/client'; // Import the SubscriptionTier type

@Injectable()
export class SubscriptionTierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubscriptionTierDto: CreateSubscriptionTierDto): Promise<SubscriptionTier> {
    return this.prisma.subscriptionTier.create({
      data: createSubscriptionTierDto,
    });
  }

  async findAll(): Promise<SubscriptionTier[]> {
    return this.prisma.subscriptionTier.findMany();
  }

  async findOne(id: number): Promise<SubscriptionTier | null> {
    return this.prisma.subscriptionTier.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateSubscriptionTierDto: UpdateSubscriptionTierDto): Promise<SubscriptionTier> {
    return this.prisma.subscriptionTier.update({
      where: { id },
      data: updateSubscriptionTierDto,
    });
  }

  async remove(id: number): Promise<SubscriptionTier> {
    return this.prisma.subscriptionTier.delete({
      where: { id },
    });
  }
}
