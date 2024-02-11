import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { AuthService } from './auth.service';
import { UserRole } from 'src/shared/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-in')
  singIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
  
  @Post('admin/sign-up')
  signUpAdmin(@Body() body: SignUpDto) {
    return this.authService.signUp({ ...body, role: UserRole.Admin });
  }

  @Post('boss/sign-up')
  signUpBoss(@Body() body: SignUpDto) {
    return this.authService.signUp({ ...body, role: UserRole.Boss });
  }
}
