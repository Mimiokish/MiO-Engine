import { EnumFunction, EnumObject, Message, MessageMap } from "../declaration";

export class MessageDispatcher {
    readonly #messageMap: MessageMap;

    constructor() {
        this.#messageMap = new Map();
    }

    public get messageMap(): MessageMap {
        return this.#messageMap;
    }
    public set messageMap(value: MessageMap) {
        throw new Error("MiO Engine | messageMap is readonly");
    }

    /**
     * @description register an message
     * @param {string} type
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public registerMessage(type: string, callback: EnumFunction, self: EnumObject): void {
        if (!type || !callback || !self) {
            throw new Error("MiO Engine | Invalid arguments");
        }

        if (!this.#messageMap.has(type)) {
            this.#messageMap.set(type, []);
        }

        const messageList: Array<Message> | undefined = this.#messageMap.get(type);
        if (messageList) {
            messageList.push({ callback, self });
        }
    }

    /**
     * @description dispatch an message
     * @param {string} type
     * @param {EnumObject} source
     */
    public dispatchMessage(type: string, source: EnumObject): void {
        const messageList: Array<Message> | undefined = this.#messageMap.get(type);
        if (messageList) {
            messageList.forEach((message: Message): void => {
                message.callback.call(message.self, source);
            });
        }
    }

    /**
     * @description remove an message
     * @param {string} type
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public removeMessage(type: string, callback: EnumFunction, self: EnumObject): void {
        const messageList: Array<Message> | undefined = this.#messageMap.get(type);
        if (messageList) {
            this.#messageMap.set(type, messageList.filter(message => message.callback !== callback || message.self !== self));
        }
    }

    /**
     * @description remove all message
     */
    public clearMessage(): void {
        this.#messageMap.clear();
    }
}
