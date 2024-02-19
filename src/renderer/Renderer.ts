import { RendererPass } from "../renderer";

export class Renderer {
    #renderPass: RendererPass;

    constructor() {
        this.#initialParams();
    }

    #initialParams(): void {
        this.#renderPass = new RendererPass({
            contextType: "WebGPU"
        });
    }
}
