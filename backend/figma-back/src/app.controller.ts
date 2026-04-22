import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { IsString, IsEmail, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JwtAuthGuard } from './auth/jwt.guard';

class CreateUserDto {
  @IsString()
  userId: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsArray()
  roles?: string[];
}

class LoginDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

class ProductDto {
  @IsString()
  productId: string;

  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  pricing?: any;

  @IsOptional()
  inventory?: any;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('users')
  @UseGuards(JwtAuthGuard)
  createUser(@Body() dto: CreateUserDto) {
    return this.appService.createUser(dto as any);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.appService.login(dto as any);
  }

  @Delete('users/:id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

  @Post('products')
  @UseGuards(JwtAuthGuard)
  createProduct(@Body() dto: ProductDto) {
    return this.appService.createProduct(dto as any);
  }

  @Get('products')
  @UseGuards(JwtAuthGuard)
  getProductAll() {
    return this.appService.getAllProduct();
  }

  @Get('products/:id')
  @UseGuards(JwtAuthGuard)
  getProduct(@Param('id') id: string) {
    return this.appService.getProduct(id);
  }

  @Delete('products/:id')
  @UseGuards(JwtAuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.appService.deleteProduct(id);
  }

  @HttpCode(200)
  @Post('auth/token')
  async generateToken(@Body() dto: LoginDto) {
    return this.authService.generateToken(dto as any);
  }
}
