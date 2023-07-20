export type EnumFunction = (...args: any[]) => any;

export type EnumObject = {
    [key: string]: string | number | boolean | EnumObject | EnumFunction;
}
