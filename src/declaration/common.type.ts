export type EnumType = string | number | boolean | null | undefined | EnumObject;

export type EnumArray = Array<EnumType | EnumObject>;

export type EnumObject = {
    [key: string]: EnumType | EnumArray | EnumObject | EnumFunction;
}

export type EnumPromise = Promise<EnumType>;

export type EnumFunction = (...args: EnumArray) => void | EnumType | EnumArray | EnumObject | EnumPromise
