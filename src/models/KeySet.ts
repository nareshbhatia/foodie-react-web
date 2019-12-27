export interface KeySet {
    [item: string]: boolean;
}

export const setKeySetKey = (
    keySet: KeySet,
    key: string,
    value: boolean
): KeySet => {
    const result: KeySet = { ...keySet };
    result[key] = value;
    return result;
};

export const keySetToArray = (keySet: KeySet): Array<string> => {
    return Object.entries(keySet)
        .filter(e => e[1])
        .map(e => e[0]);
};

export const keySetToString = (keySet: KeySet): string => {
    return keySetToArray(keySet).join(',');
};
