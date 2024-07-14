import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  LoginUserDto,
  RefreshTokenDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.guard';
import { Response } from 'express';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const response = await this.usersService.register(createUserDto, res);
    return {
      response,
    };
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const response = await this.usersService.login(loginUserDto, res);
    return {
      response,
    };
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Body() refreshToken: RefreshTokenDto, @Res() res: Response) {
    const response = await this.usersService.refreshToken(refreshToken, res);
    return {
      response,
    };
  }

  @Get('userProfile')
  async getUserProfile(@Request() req: Request) {
    const userId = req['user'].sub;
    const user = await this.usersService.findUserById(userId);
    return {
      user,
    };
  }
}
