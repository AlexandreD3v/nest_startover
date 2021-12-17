import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({message:'O nome não pode ser vazio!'})
    name: string;
  
    @IsNotEmpty({message:'O telefone não pode ser vazio!'})
    @MinLength(11, {
        message: 'O telefone deve ter no mínimo 11 dígitos',
      })
    phone: string;

    @IsNotEmpty({message:'O nome não pode ser vazio!'})
    @MinLength(11, {
        message: 'O CPF deve ter no mínimo 11 dígitos',
      })
    cpf: string;

    @IsNotEmpty({message:'O nome não pode ser vazio!'})
    logradouro: string;

    @IsNotEmpty({message:'A cidade não pode estar vazia!'})
    city: string;

    @IsNotEmpty({message:'O estado não pode estar vazio!'})
    state: string;

}

