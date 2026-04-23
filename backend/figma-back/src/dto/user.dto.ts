import { IsString, IsEmail, IsOptional, IsArray, ValidateNested } from 'class-validator';
export class CreateUserDto {
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

export class LoginDto {
    @IsOptional()
    @IsString()
    username?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  }