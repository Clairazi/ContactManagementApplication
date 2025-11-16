// src/contacts/dto/create-contact.dto.ts
import { IsEmail, IsString, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  photo?: string;
}