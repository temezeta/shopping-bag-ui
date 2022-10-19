import moment from 'moment';

export const formatDate = (
    input?: moment.MomentInput,
    format = 'D.M.YYYY',
    strict = true,
    missingValueMarker = '-'
): string => {
    const dateLike = moment(input, strict);

    if (!input || !dateLike.isValid()) {
        return missingValueMarker;
    }

    return dateLike.format(format);
};