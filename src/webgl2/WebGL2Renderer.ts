import { Renderer } from "../renderer/";
import { Canvas } from "../document-object-model/Canvas";

export class WebGL2Renderer extends Renderer {
    public get canvas(): Canvas {
        return this.target as Canvas;
    }
    public set canvas(canvas: Canvas) {
        throw new Error("MiO Engine | WebGL2Renderer - canvas cannot be set");
    }

    public get context(): WebGL2RenderingContext {
        return this.canvas.getContext("webgl2") as WebGL2RenderingContext;
    }
    public set context(context: WebGL2RenderingContext) {
        throw new Error("MiO Engine | WebGL2Renderer - gl cannot be set");
    }

    constructor(parentId?: string) {
        super();

        // initial methods
        this.#initialParams();
        this.#initialCanvas(parentId);
    }

    #initialParams(): void {
        this.type = "WebGL2";
        this.target = new Canvas();
    }

    #initialCanvas(parentId?: string): void {
        const _parentId: string | undefined = parentId;

        if (!_parentId) {
            this.canvas.appendToBody()
                .then((res: boolean): void => {
                    if (res) {
                        const parentNode: HTMLElement = this.canvas.node.parentElement as HTMLElement;

                        this.canvas.addEventListener("resize", () => {
                            this.canvas.updateSize(parentNode.clientWidth, parentNode.clientHeight);
                        });
                    }
                });
        } else {
            this.canvas.appendToElement(_parentId)
                .then((res: boolean): void => {
                    if (res) {
                        const parentNode: HTMLElement = this.canvas.node.parentElement as HTMLElement;

                        this.canvas.addEventListener("resize", () => {
                            this.canvas.updateSize(parentNode.clientWidth, parentNode.clientHeight);
                        });
                    }
                });
        }
    }
}
