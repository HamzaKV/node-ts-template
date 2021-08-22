type TObject = {
    [key: string]:
        | string
        | string[]
        | number
        | number[]
        | TObject
        | TObject[]
        | null
        | undefined;
};

export {
    TObject,
};