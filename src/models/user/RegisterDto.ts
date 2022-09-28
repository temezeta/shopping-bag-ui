export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    office?: any; // TODO This should be office ID
    password: string;
    repeatPassword: string;
}
