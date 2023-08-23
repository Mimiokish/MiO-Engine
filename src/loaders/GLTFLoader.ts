import { Loader } from "./Loader";
import { ResponseData } from "../declaration";

export class GLTFLoader extends Loader {
    constructor() {
        super();

        this.#initialParams();
    }

    #initialParams(): void {
        this.crossOrigin = "anonymous";
    }

    #handleGLTF(data: ArrayBuffer): string {
        console.log(2323, data);
        return "pass";
    }

    public async load(url: string): Promise<ResponseData | boolean | Error> {
        try {
            await super.load(url);

            const response: Response | Error = await super.fetch();

            if (response instanceof Response) {
                console.log("MiO Engine | GLTFLoader - fetch success: ", response);
                await super.handleResponseStatus(response);

                const data: ResponseData | Error = await super.handleResponseData(response, "json");

                if (data) {
                    console.log("MiO Engine | GLTFLoader - file load success: ", data);

                    // this.controller.set("", data);

                    return Promise.resolve(data);
                }
            }

            console.error(new Error("MiO Engine | GLTFLoader - file load failed: unknown"));
            return Promise.resolve(false);
        } catch(error) {
            console.error(new Error("MiO Engine | GLTFLoader - file load failed: " + error));
            return Promise.resolve(false);
        }
    }
}
