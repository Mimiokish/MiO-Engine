import { WebGLContextType, WebGLTarget } from "../declaration";

export class WebGL2Parameters {
    #type: WebGLContextType;
    #target: WebGLTarget;

    protected get type(): WebGLContextType {
        return this.#type;
    }
    protected set type(type: WebGLContextType) {
        this.#type = type;
    }

    protected get target(): WebGLTarget {
        return this.#target;
    }
    protected set target(target: WebGLTarget) {
        this.#target = target;
    }

    constructor() {
        this.type = "" as unknown as WebGLContextType;
        this.target = null as unknown as WebGLTarget;
    }
}
