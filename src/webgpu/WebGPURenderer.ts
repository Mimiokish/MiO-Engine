import { Renderer } from "../renderer";

export class WebGPURenderer extends Renderer {
    constructor() {
        super();

        // initial methods
        this.#initialParams();
    }

    #initialParams() {
        this.type = "WebGPU";
    }
}
