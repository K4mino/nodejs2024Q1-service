import { IsNotEmpty } from 'class-validator';

interface ICreateUserDto {
  login: string;
  password: string;
}

export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  password: string;
  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
