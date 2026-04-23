import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  customerId: string;

  @IsString()
  customerCode: string;

  @IsString()
  companyId: string;

  @IsString()
  customerType: string;

  @IsString()
  displayName: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsObject()
  contact?: Record<string, any>;

  @IsOptional()
  @IsArray()
  addresses?: any[];

  @IsOptional()
  @IsObject()
  personProfile?: Record<string, any>;

  @IsOptional()
  @IsObject()
  businessProfile?: Record<string, any>;

  @IsOptional()
  @IsArray()
  documents?: any[];

  @IsOptional()
  @IsObject()
  billingProfile?: Record<string, any>;

  @IsOptional()
  @IsObject()
  classification?: Record<string, any>;

  @IsOptional()
  @IsObject()
  preferences?: Record<string, any>;

  @IsOptional()
  @IsObject()
  consents?: Record<string, any>;

  @IsOptional()
  @IsObject()
  notes?: Record<string, any>;
}
