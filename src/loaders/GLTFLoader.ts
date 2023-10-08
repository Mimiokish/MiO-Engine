import { Loader } from "./Loader";
import { ResponseData, GLTFConfig, Buffer, BufferView } from "../declaration";

export class GLTFLoader extends Loader {
    constructor() {
        super();

        this.#initialParams();
    }

    #initialParams(): void {
        this.requestMode = "cors";
        this.requestCredentials = "same-origin";
    }

    public async load(url: string): Promise<ResponseData | boolean | Error> {
        try {
            const _url: string = this.resolveURL(url);

            const response: Response | Error = await this.fetch(_url);

            if (response instanceof Error || !response) {
                console.error(new Error("MiO Engine | GLTFLoader - file load failed: unknown"));
                return Promise.resolve(false);
            }

            const cfgGltf: GLTFConfig = await response.json();
            const path: string = _url.split("/").slice(0, -1).join("/");
            // console.log("GLTF | Raw: ", cfgGltf);

            const indexBufferView = 0;
            const bufferView: BufferView = cfgGltf.bufferViews[indexBufferView];
            // console.log("GLTF | BufferView: ", bufferView);

            if (bufferView) {
                // get current buffer info
                const indexBuffer: number = bufferView.buffer;
                const byteOffset: number = bufferView.byteOffset;
                const byteLength: number = bufferView.byteLength;

                // get current buffer data
                const buffer: Buffer = cfgGltf.buffers[indexBuffer];
                const bufferUri: string = buffer.uri;

                const DataBin: Response | Error = await super.fetch(path + "/" + bufferUri);
                console.log("GLTF | Bin Data: ", DataBin);

                if ("arrayBuffer" in DataBin) {
                    const bufferViewData: Uint8Array = new Uint8Array(await DataBin.arrayBuffer(), byteOffset, byteLength);
                    console.log("GLTF | Array Buffer: ", bufferViewData);
                }
            }

            return Promise.resolve(true);
        } catch(error) {
            console.error(new Error("MiO Engine | GLTFLoader - file load failed: " + error));
            return Promise.resolve(false);
        }
    }
}
