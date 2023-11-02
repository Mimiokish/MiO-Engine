import { EnumFunction, EnumObject, Event, EventMap, EventType } from "../declaration";

/**
 * @description event dispatcher
 */
export class EventDispatcher {
    readonly #eventMap: EventMap;

    constructor() {
        this.#eventMap = new Map();
    }

    public get eventMap(): EventMap {
        return this.#eventMap;
    }
    public set eventMap(value: EventMap) {
        throw new Error("MiO Engine | eventMap is readonly");
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
     * @description dispatch an event
     * @param {EventType} type
     * @param {EnumObject} source
     */
    public dispatchEvent(type: EventType, source: EnumObject): void {
        const eventList: Array<Event> | undefined = this.#eventMap.get(type);
        if (eventList) {
            eventList.forEach((event: Event): void => {
                event.callback.call(event.self, source);
            });
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
     * @description remove all event
     */
    public clearEvent(): void {
        this.#eventMap.clear();
    }
}
