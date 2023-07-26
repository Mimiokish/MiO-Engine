/**
 * @description event dispatcher
 */
class EventDispatcher {
    static _instance;
    _eventMap;
    _eventMapCustom;
    constructor() {
        this._eventMap = new Map();
        this._eventMapCustom = new Map();
    }
    get eventMap() {
        return this._eventMap;
    }
    set eventMap(value) {
        throw new Error('eventMap is readonly');
    }
    get eventMapCustom() {
        return this._eventMapCustom;
    }
    set eventMapCustom(value) {
        throw new Error('eventMapCustom is readonly');
    }
    /**
     * @description register an event
     * @param {EventTypeDefault} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    registerEvent(eventName, callback, self) {
        if (!eventName || !callback || !self) {
            throw new Error('MiO Engine | Invalid arguments');
        }
        if (!this._eventMap.has(eventName)) {
            this._eventMap.set(eventName, []);
        }
        const eventList = this._eventMap.get(eventName);
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
    registerCustomEvent(eventName, callback, self) {
        if (!eventName || !callback || !self) {
            throw new Error('MiO Engine | Invalid arguments');
        }
        if (!this._eventMapCustom.has(eventName)) {
            this._eventMapCustom.set(eventName, []);
        }
        const eventList = this._eventMapCustom.get(eventName);
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
    removeEvent(eventName, callback, self) {
        const eventList = this._eventMap.get(eventName);
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
    removeCustomEvent(eventName, callback, self) {
        const eventListCustom = this._eventMapCustom.get(eventName);
        if (eventListCustom) {
            this._eventMapCustom.set(eventName, eventListCustom.filter(eventCustom => eventCustom.callback !== callback || eventCustom.self !== self));
        }
    }
    /**
     * @description remove all event
     */
    removeAllEvent() {
        this._eventMap.clear();
        this._eventMapCustom.clear();
    }
    /**
     * @description dispatch an event
     * @param {EventTypeDefault} eventName
     * @param {EnumObject} source
     */
    dispatchEvent(eventName, source) {
        const eventList = this._eventMap.get(eventName);
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
    dispatchEventCustom(eventName, source) {
        const eventListCustom = this._eventMapCustom.get(eventName);
        if (eventListCustom) {
            eventListCustom.forEach(eventCustom => {
                eventCustom.callback.call(eventCustom.self, source);
            });
        }
    }
}

const event = new EventDispatcher();
console.log(111, event);
console.log('MiO-Engine | Enjoy Coding!');
//# sourceMappingURL=mio-engine.js.map
