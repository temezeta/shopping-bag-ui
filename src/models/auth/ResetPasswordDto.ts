export interface ResetPasswordDto {
    resetToken: string;
    password: string;
    repeatPassword: string;
}
