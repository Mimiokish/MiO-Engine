import { WebGPUParams, WebGPUAdapter, WebGPUContext, WebGPUDevice } from "../declaration";

export class WebGPURenderPass {
    #webGpuAdapter: WebGPUAdapter;
    #webGpuDevice: WebGPUDevice;
    #webGpuContext: WebGPUContext;

    constructor(params: WebGPUParams) {
        this.#initialParams(params);
    }

    async #initialParams(params: WebGPUParams): Promise<boolean> {
        const _context: GPUCanvasContext = params.context;

        if (!navigator.gpu) {
            console.error("MiO-Engine | WebGPU is not supported");
            return false;
        }

        this.#webGpuAdapter = await navigator.gpu.requestAdapter() as WebGPUAdapter;
        if (!this.#webGpuAdapter) {
            console.error("MiO-Engine | WebGPUAdapter initial failed");
            return false;
        }

        this.#webGpuDevice = await this.#webGpuAdapter.requestDevice() as WebGPUDevice;
        if (!this.#webGpuAdapter) {
            console.error("MiO-Engine | a browser that supports WebGPU is needed");
            return false;
        }

        this.#webGpuContext = _context as WebGPUContext;
        this.#webGpuContext.configure({
            device: this.#webGpuDevice,
            format: navigator.gpu.getPreferredCanvasFormat()
        });
        console.log(3434, navigator.gpu.getPreferredCanvasFormat());

        return true;
    }
}
