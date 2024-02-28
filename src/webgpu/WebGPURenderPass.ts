import { WebGPURenderPassParameters, WebGPURenderPipelineParameters, WebGPU, WebGPUAdapter, WebGPUContext, WebGPUDevice } from "../declaration";

export class WebGPURenderPass {
    #webGpu: WebGPU;
    #webGpuAdapter: WebGPUAdapter;
    #webGpuDevice: WebGPUDevice;
    #webGpuContext: WebGPUContext;

    constructor(params: WebGPURenderPassParameters) {
        this.#initialParams(params).then((res: boolean): void => {
            if (res) {
                console.log("MiO-Engine | engine is ready to go, enjoy coding~");
            }
        });
    }

    async #initialParams(params: WebGPURenderPassParameters): Promise<boolean> {
        const _context: GPUCanvasContext = params.context;

        this.#webGpu = navigator.gpu;
        if (!this.#webGpu) {
            console.error("MiO-Engine | WebGPU is not supported");
            return false;
        }

        this.#webGpuAdapter = await this.#webGpu.requestAdapter() as WebGPUAdapter;
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
        try {
            this.#webGpuContext.configure({
                device: this.#webGpuDevice,
                format: navigator.gpu.getPreferredCanvasFormat()
            });
        } catch (error) {
            console.error("MiO-Engine | context configure error: " + error);
            return false;
        }

        return true;
    }

    public generalShaderModule(): void {}

    public generalRenderPipeline(descriptor: WebGPURenderPipelineParameters): void {}
}
