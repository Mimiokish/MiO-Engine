import { Canvas } from "../document-object-model/Canvas";

export type RendererType =
    | "WebGL"
    | "WebGL2"
    | "WebGPU"

export type RendererTarget =
    | Canvas
