import { EnumFunction, EnumObject } from "./";

export type Event = {
    self: EnumObject
    callback: EnumFunction
}

export type EventMap = Map<EventType, Array<Event>>

export type EventMapCustom = Map<string, Array<Event>>

export type EventType = EventTypeMouse | EventTypeKeyboard

export type EventTypeMouse =
    | "click"
    | "dblclick"
    | "mousedown"
    | "mousemove"
    | "mouseout"
    | "mouseover"
    | "mouseup"
    | "mousewheel"
    | "wheel"

export type EventTypeKeyboard =
    | "keydown"
    | "keypress"
    | "keyup"
