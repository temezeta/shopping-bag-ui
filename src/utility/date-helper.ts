import moment from 'moment';

export const formatDate = (
    input?: moment.MomentInput,
    format = 'DD.MM.YYYY',
    strict = true,
    missingValueMarker = '-'
): string => {
    const dateLike = moment(input, strict);

    if (!input || !dateLike.isValid()) {
        return missingValueMarker;
    }

    return dateLike.format(format);
};

export const sortByDate = (
    a?: moment.MomentInput,
    b?: moment.MomentInput
): number => {
    if (!a) return 1;
    if (!b) return -1;
    return moment(a, true).diff(moment(b, true));
};
