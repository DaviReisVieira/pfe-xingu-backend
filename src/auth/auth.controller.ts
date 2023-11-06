import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthCredentialsDto } from './dto/signup-auth-credentials.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInAuthCredentialsDto } from './dto/signin-auth-credentials.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() authCredentialsDto: SignUpAuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(
    @Body() signInAuthCredentialsDto: SignInAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInAuthCredentialsDto);
  }
}
