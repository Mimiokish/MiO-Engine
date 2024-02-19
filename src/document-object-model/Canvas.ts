import { CanvasNode, CanvasContextType, CanvasContext, EnumArray, EnumFunction } from "../declaration";
import { DocumentObjectModel } from "./DocumentObjectModel";

export class Canvas extends DocumentObjectModel {
    public get node(): CanvasNode {
        return super.node as CanvasNode;
    }

    constructor() {
        super("canvas");
    }

    public getContext(type: CanvasContextType): CanvasContext {
        return this.node.getContext(type) as CanvasContext;
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
