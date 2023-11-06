import { EventDispatcher } from "../event";
import Utils from "../utils";

export class Object3D extends EventDispatcher {
    #uuid: string;

    constructor() {
        super();

        this.#initialParams();
    }

    #initialParams(): void {
        this.#uuid = Utils.General.GenerateUUID();
        console.log(111, this.#uuid);
    }
}
