/**
 * @description event dispatcher
 */
class EventDispatcher {
    #eventMap;
    #eventMapCustom;
    constructor() {
        this.#eventMap = new Map();
        this.#eventMapCustom = new Map();
    }
    get eventMap() {
        return this.#eventMap;
    }
    set eventMap(value) {
        throw new Error("eventMap is readonly");
    }
    get eventMapCustom() {
        return this.#eventMapCustom;
    }
    set eventMapCustom(value) {
        throw new Error("eventMapCustom is readonly");
    }
    /**
     * @description register an event
     * @param {EventTypeDefault} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    registerEvent(eventName, callback, self) {
        if (!eventName || !callback || !self) {
            throw new Error("MiO Engine | Invalid arguments");
        }
        if (!this.#eventMap.has(eventName)) {
            this.#eventMap.set(eventName, []);
        }
        const eventList = this.#eventMap.get(eventName);
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
            throw new Error("MiO Engine | Invalid arguments");
        }
        if (!this.#eventMapCustom.has(eventName)) {
            this.#eventMapCustom.set(eventName, []);
        }
        const eventList = this.#eventMapCustom.get(eventName);
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
        const eventList = this.#eventMap.get(eventName);
        if (eventList) {
            this.#eventMap.set(eventName, eventList.filter(event => event.callback !== callback || event.self !== self));
        }
    }
    /**
     * @description remove an event
     * @param {String} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    removeCustomEvent(eventName, callback, self) {
        const eventListCustom = this.#eventMapCustom.get(eventName);
        if (eventListCustom) {
            this.#eventMapCustom.set(eventName, eventListCustom.filter(eventCustom => eventCustom.callback !== callback || eventCustom.self !== self));
        }
    }
    /**
     * @description remove all event
     */
    removeAllEvent() {
        this.#eventMap.clear();
        this.#eventMapCustom.clear();
    }
    /**
     * @description dispatch an event
     * @param {EventTypeDefault} eventName
     * @param {EnumObject} source
     */
    dispatchEvent(eventName, source) {
        const eventList = this.#eventMap.get(eventName);
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
        const eventListCustom = this.#eventMapCustom.get(eventName);
        if (eventListCustom) {
            eventListCustom.forEach(eventCustom => {
                eventCustom.callback.call(eventCustom.self, source);
            });
        }
    }
}

class Object3D extends EventDispatcher {
    constructor() {
        super();
        console.log(3434, this.eventMap);
    }
}

const object = new Object3D();
console.log(111, object);
console.log("MiO-Engine | Enjoy Coding!");
//# sourceMappingURL=mio-engine.js.map
