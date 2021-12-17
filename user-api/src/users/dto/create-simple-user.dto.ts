import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class CreateSimpleUserDto {
    @IsNotEmpty({message:'O nome não pode ser vazio!'})
    name: string;

    @IsNotEmpty({message:'O CPF não pode ser vazio!'})
    @MinLength(11, {
        message: 'O CPF deve ter no mínimo 11 dígitos',
      })
    cpf: string;

    @IsNotEmpty({message:'A senha não pode estar vazia!'})
    password: string;

    @IsNotEmpty()
    passwordConfirmation: string;

}

