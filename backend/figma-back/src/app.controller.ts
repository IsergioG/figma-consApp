import { Controller, Get, Post, Body, Param, Delete, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { ProductDto } from './dto/product.dto';
import { CreateCustomerDto } from './dto/customer.dto';
import { CreateOrganizationDto } from './dto/organization.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.appService.createUser(dto as any);
  }
  
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {

    const loginData= await this.appService.login(dto as any);
    if (loginData.ok==true) {
      {
        return this.authService.generateToken({ username: dto.username, email: dto.email });
      }
    } else {
      return { ok: false, message: 'Invalid credentials' };
    }
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

  @Post('products')
  createProduct(@Body() dto: ProductDto) {
    return this.appService.createProduct(dto as any);
  }

  @Get('products')
  getProductAll() {
    return this.appService.getAllProduct();
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return this.appService.getProduct(id);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    return this.appService.deleteProduct(id);
  }

  @Post('customers')
  createCustomer(@Body() dto: CreateCustomerDto) {
    return this.appService.createCustomer(dto as any);
  }

  @Get('customers')
  getAllCustomers() {
    return this.appService.getAllCustomers();
  }

  @Get('customers/:id')
  getCustomer(@Param('id') id: string) {
    return this.appService.getCustomer(id);
  }

  @Post('organizations')
  createOrganization(@Body() dto: CreateOrganizationDto) {
    return this.appService.createOrganization(dto as any);
  }

  @Get('organizations')
  getAllOrganizations() {
    return this.appService.getAllOrganizations();
  }

  @Get('organizations/:id')
  getOrganization(@Param('id') id: string) {
    return this.appService.getOrganization(id);
  }

  @HttpCode(200)
  @Post('auth/token')
  async generateToken(@Body() dto: LoginDto) {
    return this.authService.generateToken(dto as any);
  }
}
