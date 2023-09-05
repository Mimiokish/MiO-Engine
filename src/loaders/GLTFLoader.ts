import { Loader } from "./Loader";
import { ResponseData, GLTFConfig, Buffer, BufferView } from "../declaration";

export class GLTFLoader extends Loader {
    constructor() {
        super();

        this.#initialParams();
    }

    #initialParams(): void {
        this.crossOrigin = "anonymous";
    }

    public async load(url: string): Promise<ResponseData | boolean | Error> {
        try {
            const _url: string = this.resolveURL(url);

            const res: Response | Error = await super.fetch(_url);

            if (res instanceof Response) {
                const cfgGltf: GLTFConfig = await res.json();
                const path = _url.split("/").slice(0, -1).join("/");
                console.log(111, cfgGltf);

                const indexBufferView = 0;
                const bufferView: BufferView = cfgGltf.bufferViews[indexBufferView];
                console.log(333, bufferView);

                if (bufferView) {
                    // get current buffer info
                    const indexBuffer: number = bufferView.buffer;
                    const byteOffset: number = bufferView.byteOffset;
                    const byteLength: number = bufferView.byteLength;

                    // get current buffer data
                    const buffer: Buffer = cfgGltf.buffers[indexBuffer];
                    const bufferUri: string = buffer.uri;

                    const resBin: Response | Error = await super.fetch(path + "/" + bufferUri);
                    console.log(8888, resBin);

                    if ("arrayBuffer" in resBin) {
                        const bufferViewData = new Uint8Array(await resBin.arrayBuffer(), byteOffset, byteLength);
                        console.log(444, bufferViewData);
                    }
                }

                return Promise.resolve(true);
            }

            console.error(new Error("MiO Engine | GLTFLoader - file load failed: unknown"));
            return Promise.resolve(false);
        } catch(error) {
            console.error(new Error("MiO Engine | GLTFLoader - file load failed: " + error));
            return Promise.resolve(false);
        }
    }
}
