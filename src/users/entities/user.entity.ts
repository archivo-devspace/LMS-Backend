import { ApiProperty } from "@nestjs/swagger";
import { $Enums, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
    
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    role: $Enums.Role;

    @ApiProperty()
    @Exclude()
    password: string;

    @ApiProperty()
    status: $Enums.Status;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor({ ...data }: Partial<UserEntity>) {
        Object.assign(this, data);

    }
}
