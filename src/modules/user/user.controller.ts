import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/decorators/user.decorator';
import { JWTUser } from '../jwt';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.userService.findAll();
  }

  @Get('subordinates')
  @UseGuards(AuthGuard())
  findSubordinates(@User() user: JWTUser) {
    return this.userService.findSubordinateUsers(user);
  }
}
