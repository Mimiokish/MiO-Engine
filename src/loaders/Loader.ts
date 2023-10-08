import {RequestConfig, RequestMode, RequestCredentials, RequestHeaders, ResponseType, ResponseData, UrlModifier} from "../declaration";
import { LoaderController } from "./LoaderController";

export class Loader {
    #controller: LoaderController;
    #urlModifier: UrlModifier;
    #requestConfig: RequestConfig;
    #requestHeaders: RequestHeaders;

    protected get controller(): LoaderController {
        return this.#controller;
    }
    protected set controller(controller: LoaderController) {
        throw new Error("MiO Engine | Loader - controller is readonly");
    }

    protected get urlModifier(): UrlModifier {
        return this.#urlModifier;
    }
    protected set urlModifier(urlModifier: UrlModifier) {
        this.#urlModifier = urlModifier;
    }

    /**
     * @description request config
     */
    public get requestConfig(): RequestConfig {
        return this.#requestConfig;
    }
    public set requestConfig(value: string | number | boolean | undefined | null ) {
        throw new Error("MiO Engine | Loader - requestConfig is readonly");
    }

    protected get requestMode(): RequestMode {
        return this.#requestConfig.mode;
    }
    protected set requestMode(value: RequestMode) {
        this.#requestConfig.mode = value;
    }

    protected get requestCredentials(): RequestCredentials {
        return this.#requestConfig.credentials;
    }
    protected set requestCredentials(value: RequestCredentials) {
        this.#requestConfig.credentials = value;
    }

    /**
     * @description request headers
     */
    public get requestHeaders(): RequestHeaders {
        return this.#requestHeaders;
    }
    public set requestHeaders(value: string | number | boolean | undefined | null ) {
        throw new Error("MiO Engine | Loader - requestHeaders is readonly");
    }

    constructor() {
        this.#initialParams();
    }

    #initialParams(): void {
        this.#controller = new LoaderController();
        this.urlModifier = undefined;

        // set default request config
        this.#requestConfig = {
            mode: "cors",
            credentials: "include"
        };

        // set default request headers
        this.#requestHeaders = {};
    }

    protected resolveURL(url: string): string {
        const _url: string = url;
        if (!_url) {
            console.error(new Error("MiO Engine | Loader - resolveURL failed: url is required"));
            return "";
        }

        if (this.urlModifier) {
            return this.urlModifier(_url);
        }

        return _url;
    }

    protected async handleResponseStatus(response: Response): Promise<boolean | Error> {
        try {
            if (!response.ok) {
                return Promise.reject("failed to fetch from url");
            }

            if (response.status !== 200) {
                return Promise.reject("response status " + response.status + " received");
            }

            return Promise.resolve(true);
        } catch(error) {
            return Promise.reject("failed to handle response status: " + error);
        }
    }

    protected async fetch(url: string): Promise<Response | Error> {
        try {
            const req: Request = new Request(url, {
                headers: new Headers(this.requestHeaders)
            });

            const response: Response = await fetch(req);

            const responseStatus: boolean | Error = await this.handleResponseStatus(response);

            if (!responseStatus) {
                return Promise.reject(false);
            }

            return Promise.resolve(response);
        } catch(error) {
            return Promise.reject("failed to fetch from url with unknown message: " + error);
        }
    }

    // protected async handleResponseData(response: Response, responseType: ResponseType): Promise<ResponseData> {
    //     try {
    //         switch (responseType) {
    //             case "arraybuffer":
    //                 return Promise.resolve(response.arrayBuffer());
    //             case "blob":
    //                 return Promise.resolve(response.blob());
    //             case "json":
    //                 return Promise.resolve(response.json());
    //             default:
    //                 return Promise.resolve(response.text());
    //         }
    //     } catch(error) {
    //         return Promise.reject("failed to handle response data: " + error);
    //     }
    // }
}
