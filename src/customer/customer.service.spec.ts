import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  async findAll() {
    return this.prisma.customer.findMany();
  }

  async findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}



//using entities


// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { Customer } from './entities/customer.entity';

// @Injectable()
// export class CustomerService {
//   constructor(private readonly prisma: PrismaService) {}

//   async findAll(): Promise<Customer[]> {
//     const customers = await this.prisma.user.findMany({
//       include: { profile: true }, // Assuming a relation to TrainerProfile
//     });

//     return customers.map((customer) => this.mapToEntity(customer));
//   }

//   private mapToEntity(customer: any): Customer {
//     return {
//       id: customer.id,
//       name: customer.username,
//       email: customer.email,
//       phone: customer.phoneNumber || null,
//       address: customer.address || null,
//       createdAt: customer.createdAt,
//       updatedAt: customer.updatedAt,
//       trainerProfileId: customer.profile?.id || null,
//       notes: customer.notes || null,
//       isActive: customer.deletedAt === null, // Active if not soft-deleted
//     };
//   }
// }

// import { Test, TestingModule } from '@nestjs/testing';
// import { CustomerService } from './customer.service';

// describe('CustomerService', () => {
//   let service: CustomerService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [CustomerService],
//     }).compile();

//     service = module.get<CustomerService>(CustomerService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
