import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    oldPassword: string; // previous password
    newPassword: string; // new password
    constructor(oldPassword: string, newPassword: string) {
        super();
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
