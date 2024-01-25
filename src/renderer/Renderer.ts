import { RenderPass } from "../renderer";

export class Renderer {
    #renderPass: RenderPass;

    constructor() {
        this.#initialParams();
    }

    #initialParams(): void {
        this.#renderPass = new RenderPass();
    }
}
