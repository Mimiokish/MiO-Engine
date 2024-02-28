export class WebGPUBuffer {
    #self: Map<string, string>;

    constructor() {
        this.#initialParams();
    }

    #initialParams() {
        this.#self = new Map();
    }

    public create(label: string, size: string | number, usage: string): void {}
}
