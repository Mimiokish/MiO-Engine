export type EventMap = {
    [type: string]: {
        listener: () => any;
        self: {
            [key: string]: any;
        };
    }[];
};
