import { LoaderStatus, EnumType } from "../declaration";

export class LoaderController {
    #status: LoaderStatus;
    #queue: Map<string, EnumType>;

    constructor() {
        this.#initialParams();
    }

    #initialParams(): void {
        this.#status = "idle";
    }

    public get status(): LoaderStatus {
        return this.#status;
    }
    public set status(status: LoaderStatus) {
        this.#status = status;
    }

    public get queue(): Map<string, EnumType> {
        return this.#queue;
    }
    public set queue(queue: Map<string, EnumType>) {
        throw new Error("MiO Engine | LoaderController - queue is readonly");
    }

    public set(key: string, type: EnumType): void {
        const _key: string = key;
        if (!_key) {
            console.error(new Error("MiO Engine | LoaderController - set failed: key is required"));
            return;
        }

        this.#queue.set(_key, type);
    }

    public delete(url: string): void {
        this.#queue.delete(url);
    }
}
