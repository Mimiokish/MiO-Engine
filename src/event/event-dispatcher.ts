import { EnumFunction, EnumObject, Event, EventMap, EventMapCustom, EventTypeDefault } from '../declaration';

/**
 * @description event dispatcher
 */
export class EventDispatcher {
    private static _instance: EventDispatcher;
    private _eventMap: EventMap;
    private _eventMapCustom: EventMapCustom;

    constructor() {
        this._eventMap = new Map();
        this._eventMapCustom = new Map();
    }

    public get eventMap(): EventMap {
        return this._eventMap;
    }
    public set eventMap(value: EventMap) {
        throw new Error('eventMap is readonly');
    }

    public get eventMapCustom(): EventMapCustom {
        return this._eventMapCustom;
    }
    public set eventMapCustom(value: EventMapCustom) {
        throw new Error('eventMapCustom is readonly');
    }

    /**
     * @description register an event
     * @param {EventTypeDefault} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public registerEvent(eventName: EventTypeDefault, callback: EnumFunction, self: EnumObject): void {
        if (!eventName || !callback || !self) {
            throw new Error('MiO Engine | Invalid arguments');
        }

        if (!this._eventMap.has(eventName)) {
            this._eventMap.set(eventName, []);
        }

        const eventList: Array<Event> | undefined = this._eventMap.get(eventName);
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
            throw new Error('MiO Engine | Invalid arguments');
        }
    
        if (!this._eventMapCustom.has(eventName)) {
            this._eventMapCustom.set(eventName, []);
        }
    
        const eventList: Array<Event> | undefined = this._eventMapCustom.get(eventName);
        if (eventList) {
            eventList.push({ callback, self });
        }
    }

    /**
     * @description remove an event
     * @param {EventTypeDefault} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public removeEvent(eventName: EventTypeDefault, callback: EnumFunction, self: EnumObject): void {
        const eventList: Array<Event> | undefined = this._eventMap.get(eventName);
        if (eventList) {
            this._eventMap.set(eventName, eventList.filter(event => event.callback !== callback || event.self !== self));
        }
    }

    /**
     * @description remove an event
     * @param {String} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public removeCustomEvent(eventName: string, callback: EnumFunction, self: EnumObject): void {
        const eventListCustom: Array<Event> | undefined = this._eventMapCustom.get(eventName);
        if (eventListCustom) {
            this._eventMapCustom.set(eventName, eventListCustom.filter(eventCustom => eventCustom.callback !== callback || eventCustom.self !== self));
        }
    }

    /**
     * @description remove all event
     */
    public removeAllEvent(): void {
        this._eventMap.clear();
        this._eventMapCustom.clear();
    }

    /**
     * @description dispatch an event
     * @param {EventTypeDefault} eventName
     * @param {EnumObject} source
     */
    public dispatchEvent(eventName: EventTypeDefault, source: EnumObject): void {
        const eventList: Array<Event> | undefined = this._eventMap.get(eventName);
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
        const eventListCustom: Array<Event> | undefined = this._eventMapCustom.get(eventName);
        if (eventListCustom) {
            eventListCustom.forEach(eventCustom => {
                eventCustom.callback.call(eventCustom.self, source);
            });
        }
    }
}
