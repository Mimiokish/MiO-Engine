import { EventDispatcher } from "../event";

export class ObjectUserInterface extends EventDispatcher {
    constructor() {
        super();
        console.log(3434, this.eventMap);
    }
}
