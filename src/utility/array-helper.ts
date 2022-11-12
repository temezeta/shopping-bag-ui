export const updateOrAdd = <T>(
    arr: T[],
    comparison: (pred: T) => any,
    val: T
): void => {
    const found = arr.findIndex((it) => comparison(it) === comparison(val));
    if (found !== -1) {
        arr[found] = val;
    } else {
        arr.push(val);
    }
};
