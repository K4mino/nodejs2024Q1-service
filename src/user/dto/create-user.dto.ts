interface ICreateUserDto {
    login: string;
    password: string;
  }

export class CreateUserDto implements ICreateUserDto{
    login: string;
    password: string;
    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }
}
