import { Role } from '../enums/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES = 'roles';

// This allows you to pass multiple roles as parameters to the decorator
export const Roles = (...roles: Role[]) => SetMetadata(ROLES, roles);
