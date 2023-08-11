import { EnumFunction, EnumObject, Event, EventMap, EventMapCustom, EventType } from "../declaration";

/**
 * @description event dispatcher
 */
export class EventDispatcher {
    readonly #eventMap: EventMap;
    readonly #eventMapCustom: EventMapCustom;

    constructor() {
        this.#eventMap = new Map();
        this.#eventMapCustom = new Map();
    }

    public get eventMap(): EventMap {
        return this.#eventMap;
    }
    public set eventMap(value: EventMap) {
        throw new Error("eventMap is readonly");
    }

    public get eventMapCustom(): EventMapCustom {
        return this.#eventMapCustom;
    }
    public set eventMapCustom(value: EventMapCustom) {
        throw new Error("eventMapCustom is readonly");
    }

    /**
     * @description register an event
     * @param {EventType} type
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public registerEvent(type: EventType, callback: EnumFunction, self: EnumObject): void {
        if (!type || !callback || !self) {
            throw new Error("MiO Engine | Invalid arguments");
        }

        if (!this.#eventMap.has(type)) {
            this.#eventMap.set(type, []);
        }

        const eventList: Array<Event> | undefined = this.#eventMap.get(type);
        if (eventList) {
            eventList.push({ callback, self });
        }
    }

    /**
     * @description register an custom event
     * @param {String} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public registerCustomEvent(eventName: string, callback: EnumFunction, self: EnumObject): void {
        if (!eventName || !callback || !self) {
            throw new Error("MiO Engine | Invalid arguments");
        }

        if (!this.#eventMapCustom.has(eventName)) {
            this.#eventMapCustom.set(eventName, []);
        }

        const eventList: Array<Event> | undefined = this.#eventMapCustom.get(eventName);
        if (eventList) {
            eventList.push({ callback, self });
        }
    }

    /**
     * @description remove an event
     * @param {EventType} type
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public removeEvent(type: EventType, callback: EnumFunction, self: EnumObject): void {
        const eventList: Array<Event> | undefined = this.#eventMap.get(type);
        if (eventList) {
            this.#eventMap.set(type, eventList.filter(event => event.callback !== callback || event.self !== self));
        }
    }

    /**
     * @description remove an event
     * @param {String} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public removeCustomEvent(eventName: string, callback: EnumFunction, self: EnumObject): void {
        const eventListCustom: Array<Event> | undefined = this.#eventMapCustom.get(eventName);
        if (eventListCustom) {
            this.#eventMapCustom.set(eventName, eventListCustom.filter(eventCustom => eventCustom.callback !== callback || eventCustom.self !== self));
        }
    }

    /**
     * @description remove all event
     */
    public removeAllEvent(): void {
        this.#eventMap.clear();
        this.#eventMapCustom.clear();
    }

    /**
     * @description dispatch an event
     * @param {EventType} type
     * @param {EnumObject} source
     */
    public dispatchEvent(type: EventType, source: EnumObject): void {
        const eventList: Array<Event> | undefined = this.#eventMap.get(type);
        if (eventList) {
            eventList.forEach(event => {
                event.callback.call(event.self, source);
            });
        }
    }

    /**
     * @description dispatch an event
     * @param {String} eventName
     * @param {EnumObject} source
     */
    public dispatchEventCustom(eventName: string, source: EnumObject): void {
        const eventListCustom: Array<Event> | undefined = this.#eventMapCustom.get(eventName);
        if (eventListCustom) {
            eventListCustom.forEach(eventCustom => {
                eventCustom.callback.call(eventCustom.self, source);
            });
        }
    }
}
