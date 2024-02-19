import { CanvasContextType } from "./canvas.type";
import { WebGPURenderPass } from "../webgpu/WebGPURenderPass";

export type RendererPassParams = {
    contextType: CanvasContextType
}

export type RendererPasses =
    | WebGPURenderPass
