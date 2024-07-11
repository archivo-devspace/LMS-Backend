import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const response = await this.usersService.register(createUserDto);
    return {
      response,
    }
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const response = await this.usersService.login(loginUserDto);
    return {
      response,
    }
  }


  @Get('userProfile')
  async getUserProfile(@Request() req: Request) {
    const userId = req['user'].sub;
    const user = await this.usersService.findUserById(userId);
    return {
      user,
    }
  }

}
