import { Renderer } from "./Renderer";
import { Canvas } from "../html/Canvas";

export class WebGL2Renderer extends Renderer {
    #canvas: Canvas;

    public get gl(): WebGL2RenderingContext {
        return this.#canvas.getContext("webgl2") as WebGL2RenderingContext;
    }

    constructor(parentId?: string) {
        super();
        this.#initialParams();
        this.#initialCanvas(parentId);
    }

    #initialParams(): void {
        this.#canvas = new Canvas();
    }

    #initialCanvas(parentId?: string): void {
        const _parentId: string | undefined = parentId;

        if (!_parentId) {
            this.#canvas.appendToBody()
                .then((res: boolean): void => {
                    if (res) {
                        const parentNode: HTMLElement = this.#canvas.node.parentElement as HTMLElement;

                        this.#canvas.addEventListener("resize", () => {
                            this.#canvas.updateSize(parentNode.clientWidth, parentNode.clientHeight);
                        });
                    }
                });
        } else {
            this.#canvas.appendToElement(_parentId)
                .then((res: boolean): void => {
                    if (res) {
                        const parentNode: HTMLElement = this.#canvas.node.parentElement as HTMLElement;

                        this.#canvas.addEventListener("resize", () => {
                            this.#canvas.updateSize(parentNode.clientWidth, parentNode.clientHeight);
                        });
                    }
                });
        }
    }
}
