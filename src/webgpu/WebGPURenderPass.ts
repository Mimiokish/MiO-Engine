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
        this.#webGpuContext.configure({
            device: this.#webGpuDevice,
            format: navigator.gpu.getPreferredCanvasFormat()
        });

        // hardcoded test
        const module = this.#webGpuDevice.createShaderModule({
            label: "our hardcoded red triangle shaders",
            code: `
                    @group(0) @binding(0) var<storage, read_write> data: array<f32>;
 
                    @compute @workgroup_size(1) fn computeSomething(@builtin(global_invocation_id) id: vec3u) {
                        let i = id.x;
                        data[i] = data[i] * 2.0;
                    }
                `,
        });
        const pipeline = this.#webGpuDevice.createRenderPipeline({
            label: "our hardcoded red triangle pipeline",
            layout: "auto",
            vertex: {
                module,
                entryPoint: "vs"
            },
            fragment: {
                module,
                entryPoint: "fs",
                targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }]
            }
        });
        const renderPassDescriptor = {
            label: "our basic canvas renderPass",
            colorAttachments: [
                {
                    // view: <- to be filled out when we render
                    view: this.#webGpuContext.getCurrentTexture().createView(),
                    clearValue: [0.4, 0.4, 0.4, 1],
                    loadOp: "clear",
                    storeOp: "store"
                }
            ]
        };

        renderPassDescriptor.colorAttachments[0].view = this.#webGpuContext.getCurrentTexture().createView();
        const encoder = this.#webGpuDevice.createCommandEncoder({ label: "our encoder" });
        const pass = encoder.beginRenderPass(renderPassDescriptor);
        pass.setPipeline(pipeline);
        pass.draw(3);
        pass.end();

        const commandBuffer = encoder.finish();
        this.#webGpuDevice.queue.submit([commandBuffer]);

        return true;
    }

    public generalShaderModule(): void {}

    public generalRenderPipeline(descriptor: WebGPURenderPipelineParameters): void {}
}
