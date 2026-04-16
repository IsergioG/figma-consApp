import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { IsString, IsEmail, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.appService.createUser(dto as any);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.appService.login(dto as any);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

  @Post('products')
  createProduct(@Body() dto: ProductDto) {
    return this.appService.createProduct(dto as any);
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return this.appService.getProduct(id);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    return this.appService.deleteProduct(id);
  }
}
