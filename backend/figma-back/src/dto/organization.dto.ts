import { IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  companyId: string;

  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  organizationType?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
