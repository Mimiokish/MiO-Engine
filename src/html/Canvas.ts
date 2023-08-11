import { WebGLContext, WebGLContextType } from "../declaration";
import { EnumArray, EnumFunction } from "../declaration";
import { DocumentObjectModel } from "./DocumentObjectModel";

export class Canvas extends DocumentObjectModel {
    public get node(): HTMLCanvasElement {
        return super.node as HTMLCanvasElement;
    }

    constructor() {
        super("canvas");
    }

    public getContext(type: WebGLContextType): WebGLContext  {
        return this.node.getContext(type) as WebGLContext;
    }

    public updateSize(width: number, height: number): void {
        this.node.width = width;
        this.node.height = height;
    }

    public addEventListener(type: string, fn: EnumFunction, ...args: EnumArray): void {
        window.addEventListener(type, (): void => {
            fn.call(null, ...args);
        });
    }
}
