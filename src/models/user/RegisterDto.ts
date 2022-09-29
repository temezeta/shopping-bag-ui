export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    officeId?: number; // TODO This should be office ID in backend
    password: string;
    repeatPassword: string;
}
