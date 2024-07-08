import { Role, Status } from '@prisma/client';

export class UserProfileDto {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}