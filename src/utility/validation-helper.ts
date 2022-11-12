const ALLOWED_EMAIL_DOMAIN = process.env.REACT_APP_ALLOWED_EMAIL_DOMAIN;
export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const PASSWORD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const URL_REGEX = /^(http|https):\/\/[^ "]+$/;

export const isValidEmail = (email: string): boolean => {
    if (!EMAIL_REGEX.test(email)) {
        return false;
    }
    const allowedDomains =
        ALLOWED_EMAIL_DOMAIN?.split(';').filter((it) => !!it) ?? [];
    return allowedDomains.some((it) => email.trim().endsWith(it));
};

export const isValidPassword = (password: string): boolean => {
    return PASSWORD_REGEX.test(password);
};

export const isUrl = (url: string): boolean => {
    return URL_REGEX.test(url);
};

export const oneFieldRequired = (
    firstField?: string,
    secondField?: string
): boolean => {
    return Boolean(firstField) || Boolean(secondField);
};
