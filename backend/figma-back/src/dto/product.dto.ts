
import { IsString, IsEmail, IsOptional, IsArray, ValidateNested } from 'class-validator';
export class ProductDto {
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