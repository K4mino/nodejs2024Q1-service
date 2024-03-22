import { IsString, IsNotEmpty } from 'class-validator';
export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    oldPassword: string;
    @IsString()
    @IsNotEmpty()
    newPassword: string; 
    constructor(oldPassword: string, newPassword: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
