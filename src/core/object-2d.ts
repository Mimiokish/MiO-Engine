import { EventDispatcher } from "../event";

export class Object2D extends EventDispatcher {
    constructor() {
        super();
        console.log(3434, this.eventMap);
    }
}
