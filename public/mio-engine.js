/**
 * @description event dispatcher
 */
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
    }
    Object.defineProperty(EventDispatcher.prototype, "eventMap", {
        get: function () {
            if (!this._eventMap) {
                this._eventMap = {};
            }
            return this._eventMap;
        },
        set: function (value) {
            throw new Error('eventMap is readonly');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EventDispatcher.prototype, "eventMapCustom", {
        get: function () {
            if (!this._eventMapCustom) {
                this._eventMapCustom = {};
            }
            return this._eventMapCustom;
        },
        set: function (value) {
            throw new Error('eventMapCustom is readonly');
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description register an event
     * @param {String} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    EventDispatcher.prototype.registerEvent = function (eventName, callback, self) { };
    /**
     * @description register an custom event
     * @param {String} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    EventDispatcher.prototype.registerCustomEvent = function (eventName, callback, self) { };
    /**
     * @description remove an event
     * @param {String} eventName
     * @param {EnumFunction} callback
     * @param {EnumObject} self
     */
    EventDispatcher.prototype.removeEvent = function (eventName, callback, self) { };
    /**
     * @description remove all event
     */
    EventDispatcher.prototype.removeAllEvent = function () { };
    /**
     * @description dispatch an event
     * @param {String} eventName
     * @param {EnumObject} source
     */
    EventDispatcher.prototype.dispatchEvent = function (eventName, source) { };
    EventDispatcher._instance = null;
    return EventDispatcher;
}());

var event = new EventDispatcher();
console.log(111, event);
console.log('MiO-Engine | Enjoy Coding!');
//# sourceMappingURL=mio-engine.js.map
