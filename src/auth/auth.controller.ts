import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { AuthService } from './auth.service';
class RegisterDto { @IsString() @MinLength(2) @MaxLength(120) fullName: string; @IsEmail() @MaxLength(190) email: string; @IsString() @MinLength(8) @MaxLength(72) password: string; }
class LoginDto { @IsEmail() email: string; @IsString() @MinLength(1) password: string; }
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('register') register(@Body() dto: RegisterDto) { return this.auth.register(dto); }
  @Post('login') login(@Body() dto: LoginDto) { return this.auth.login(dto.email, dto.password); }
}
