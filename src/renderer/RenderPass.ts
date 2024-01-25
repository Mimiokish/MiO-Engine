import { WebGLContext } from "../declaration";
import { Canvas } from "../document-object-model";

export class RenderPass {
    #gl: WebGLContext;
    #node: HTMLElement;
    #canvas: Canvas;

    constructor() {
        this.#initialParams();
    }

    #initialParams() {
        this.#node = document.getElementById("MiO-Engine") as HTMLCanvasElement;

        if (!this.#node) {
            console.error("MiO-Engine | a node with ID(MiO-Engine) needs to be create before render");
            return false;
        } else {
            this.#canvas = new Canvas();
            this.#node.appendChild(this.#canvas.node);
            this.#gl = this.#canvas.getContext("WebGL2") as WebGLContext;
        }
    }
}
