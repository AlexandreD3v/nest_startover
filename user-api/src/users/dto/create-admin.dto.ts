import { User } from "../entities/user.entity"; 
import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class AdminDto {

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  message: string;
}