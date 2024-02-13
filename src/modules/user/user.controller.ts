import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/decorators/user.decorator';
import { JWTUser } from '../jwt';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }
  
  @Get()
  @UseGuards(AuthGuard(),)
  findSubordinates(@User() user: JWTUser) {
    return this.userService.findSubordinateUsers(user);
  }
  @Post('changeBoss')
  @UseGuards(AuthGuard(),)
  changeBoss(@User() user: JWTUser, userId, newBossId){
    return this.userService.changeBoss(user, userId, newBossId);
  }

}
