import { EventDispatcher } from "../event";

export class Object3D extends EventDispatcher {
    constructor() {
        super();
        console.log(3434, this.eventMap);
    }
}
