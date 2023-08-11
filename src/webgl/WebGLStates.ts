import { WebGLContext, WebGLAttributes} from "../declaration";

export class WebGLStates {
    #gl: WebGLContext;

    constructor(gl: WebGLContext) {
        this.#initialParams({
            gl: gl
        });
    }

    #initialParams(params: WebGLAttributes): void {
        const _params: WebGLAttributes = params;

        this.#gl = _params.gl;
    }

    public setViewport(x: number, y: number, z: number, w: number): void {
        this.#gl.viewport(x, y, z, w);
    }
}
