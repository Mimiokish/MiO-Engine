import { EnumFunction, EnumObject, EventMap } from '../declaration';

/**
 * @description event dispatcher
 */
export class EventDispatcher {
    private static _instance: EventDispatcher = null;
    private _eventMap: EventMap;
    private _eventMapCustom: EventMap;

    public get eventMap(): EventMap {
        if (!this._eventMap) {
            this._eventMap = {};
        }

        return this._eventMap;
    }
    public set eventMap(value: EventMap) {
        throw new Error('eventMap is readonly');
    }

    public get eventMapCustom(): EventMap {
        if (!this._eventMapCustom) {
            this._eventMapCustom = {};
        }

        return this._eventMapCustom;
    }
    public set eventMapCustom(value: EventMap) {
        throw new Error('eventMapCustom is readonly');
    }

    /**
     * @description register an event
     * @param {String} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public registerEvent(eventName: string, callback: EnumFunction, self: EnumObject): void {}

    /**
     * @description register an custom event
     * @param {String} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public registerCustomEvent(eventName: string, callback: EnumFunction, self: EnumObject): void {}

    /**
     * @description remove an event
     * @param {String} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    public removeEvent(eventName: string, callback: EnumFunction, self: EnumObject): void {}

    /**
     * @description remove all event
     */
    public removeAllEvent(): void {}

    /**
     * @description dispatch an event
     * @param {String} eventName
     * @param {EnumObject} source
     */
    public dispatchEvent(eventName: string, source: EnumObject): void {}
}
