import { Loader } from "./Loader";
import { EnumFunction } from "../declaration";

export class GLTFLoader extends Loader {
    constructor() {
        super();
    }

    async load(url: string): Promise<any> {
        try {
            await super.load(url);

            const response: Response = await fetch(this.path);

            console.log(3434, this.path);
            return Promise.resolve(null);
        } catch(error) {
            console.error("MiO Engine | GLTFLoader - file load failed: ", error);
            return Promise.reject(null);
        }
        // fetch(this.path)
        //     .then((response: Response): Promise<ArrayBuffer> => {
        //         const res: Response = super.handleResponse(response) as Response;
        //         console.log(9999);
        //
        //         return res.arrayBuffer();
        //     })
        //     .then((data: ArrayBuffer): Promise<null> | void => {
        //         const gltf = this.handleGLTF(data);
        //
        //         if (!gltf) {
        //             console.error("MiO Engine | Loader - failed to parse data");
        //             return Promise.reject(null);
        //         } else {
        //             if (onLoad) {
        //                 onLoad(gltf);
        //             }
        //         }
        //     })
        //     .catch((error): Promise<null> | void => {
        //         if (onError) {
        //             onError(error);
        //         } else {
        //             console.error("MiO Engine | Loader - failed to load gltf: ", error);
        //             return Promise.reject(null);
        //         }
        //     });
    }

    handleGLTF(data: ArrayBuffer): string {
        console.log(2323, data);
        return "pass";
    }
}
