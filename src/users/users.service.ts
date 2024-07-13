import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, RefreshTokenDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserProfileDto } from './dto/user-profile.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, firstName, lastName, password, confirmPassword, role } = createUserDto;

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

    return this.generateTokens(user);
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

    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(refreshToken.refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private async generateTokens(user: any) {
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRE_IN'),
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRE_IN'),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async findUserById(id: number): Promise<UserProfileDto> {
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
