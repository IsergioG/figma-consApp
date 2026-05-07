import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateMoneyOperationDto {
  @IsOptional()
  @IsString()
  moneyOperationId?: string;

  @IsString()
  operationType: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsOptional()
  @IsString()
  branchFinancialDayId?: string;

  @IsOptional()
  @IsString()
  businessDate?: string;

  @IsString()
  medium: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  reasonCode: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  operationStatus?: string;

  @IsOptional()
  @IsString()
  accountingStatus?: string;

  @IsOptional()
  @IsBoolean()
  approvalRequired?: boolean;

  @IsOptional()
  @IsString()
  approvalMode?: string;

  @IsOptional()
  @IsObject()
  sourceContainer?: Record<string, any>;

  @IsOptional()
  @IsObject()
  destinationContainer?: Record<string, any>;

  @IsOptional()
  @IsObject()
  references?: Record<string, any>;

  @IsOptional()
  @IsArray()
  evidenceAssetIds?: any[];

  @IsOptional()
  @IsString()
  requestedByUserId?: string;

  @IsOptional()
  @IsString()
  approvedByUserId?: string;

  @IsOptional()
  @IsString()
  createdAt?: string;

  @IsOptional()
  @IsString()
  approvedAt?: string;

  @IsOptional()
  @IsString()
  executedAt?: string;
}
