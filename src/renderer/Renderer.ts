import { RendererParams, HTMLNode, HTMLCanvas, HTMLCanvasContext } from "../declaration";
import { WebGPUCanvas } from "../document-object-model";

export class Renderer {
    #node: HTMLNode;
    #canvas: HTMLCanvas;

    public get canvas(): HTMLCanvas {
        return this.#canvas;
    }
    public set canvas(value: HTMLCanvas) {
        throw Error("MiO-Engine | Renderer - canvas is readonly");
    }

    public get context(): GPUCanvasContext {
        return this.#canvas.context;
    }
    public set context(value: string) {
        throw Error("MiO-Engine | Renderer - context is readonly");
    }

    constructor(params: RendererParams) {
        const _params: RendererParams = params;

        if (!_params || JSON.stringify(_params) == "{}") {
            console.warn("MiO-Engine | Renderer - params is missing");
        } else {
            this.#initialParams(params).then((): void => {
                console.log("MiO-Engine | Renderer - engine is ready to go, enjoy coding~");
            });
        }
    }

    async #initialParams(params: RendererParams): Promise<boolean> {
        const _contentType: string = params.contextType ? params.contextType : "WebGPU";

        this.#node = document.getElementById("MiO-Engine") as HTMLNode;
        if (!this.#node) {
            console.error("MiO-Engine | Renderer - a node with the ID(MiO-Engine) needs to be create before render");
            return false;
        }

        switch (_contentType) {
            case "WebGPU":
            case "webgpu":
                this.#canvas = new WebGPUCanvas();
                break;
            default:
                this.#canvas = new WebGPUCanvas();
        }

        this.#node.appendChild(this.#canvas.self);

        const windowWidth: number | undefined = window.innerWidth;
        const windowHeight: number | undefined = window.innerHeight;
        this.resize(windowWidth, windowHeight);
        window.addEventListener("resize", () => this.resize());

        return true;
    }

    public resize(width?: number, height?: number): void {
        const _width: number | undefined = window.innerWidth || width;
        const _height: number | undefined = window.innerHeight || height;

        this.#canvas.resize(_width, _height);
    }
}
