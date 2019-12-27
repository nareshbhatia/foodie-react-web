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

export const keySetToString = (keySet: KeySet): string => {
    const keys = Object.entries(keySet)
        .filter(e => e[1])
        .map(e => e[0]);
    return keys.join(',');
};
