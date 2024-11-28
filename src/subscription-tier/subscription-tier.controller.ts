import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubscriptionTierService } from './subscription-tier.service';
import { CreateSubscriptionTierDto } from './dto/create-subscription-tier.dto';
import { UpdateSubscriptionTierDto } from './dto/update-subscription-tier.dto';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('subscription-tiers')
export class SubscriptionTierController {
  constructor(private readonly subscriptionTierService: SubscriptionTierService) {}
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RolesGuard )
  @Post()
  create(@Body() createSubscriptionTierDto: CreateSubscriptionTierDto) {
    return this.subscriptionTierService.create(createSubscriptionTierDto);
  }
  @Get()
  findAll() {
    return this.subscriptionTierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionTierService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionTierDto: UpdateSubscriptionTierDto) {
    return this.subscriptionTierService.update(+id, updateSubscriptionTierDto);
  }
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionTierService.remove(+id);
  }
}
