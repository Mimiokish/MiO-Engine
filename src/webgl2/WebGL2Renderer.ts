import { WebGLRendererParams } from "../declaration/";
import { WebGL2Parameters } from "./WebGL2Parameters";
import { Canvas } from "../document-object-model/Canvas";

export class WebGL2Renderer extends WebGL2Parameters {
    #program: WebGLProgram;

    constructor(params: WebGLRendererParams) {
        super();

        // initial methods
        const _params: WebGLRendererParams = params;
        this.#initialParams(_params);
    }

    #initialParams(params: WebGLRendererParams): void {
        this.type = "WebGL2";
        this.target = new Canvas();
    }
}
