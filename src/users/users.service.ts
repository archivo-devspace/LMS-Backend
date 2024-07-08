import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, firstName, lastName, password, confirmPassword, role } =
      createUserDto;

    const alreadyRegistered = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (alreadyRegistered) {
      throw new BadRequestException('User already registered!');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match!.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role,
      },
    });

    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('User does not exist!');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Password is incorrect!');
    }

    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async findUserById(id: number) : Promise<UserProfileDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        status: true,
      },
    });
    return user as UserProfileDto;
  }

  
}
