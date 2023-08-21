import { RendererType, RendererTarget } from "../declaration";

export class Renderer {
    #type: RendererType;
    #target: RendererTarget;

    protected get type(): RendererType {
        return this.#type;
    }
    protected set type(type: RendererType) {
        this.#type = type;
    }

    protected get target(): RendererTarget {
        return this.#target;
    }
    protected set target(target: RendererTarget) {
        this.#target = target;
    }

    constructor() {
        this.type = "" as unknown as RendererType;
        this.target = null as unknown as RendererTarget;
    }
}
