import { ResponseType, ResponseData, UrlModifier } from "../declaration";
import { LoaderController } from "./LoaderController";

export class Loader {
    #controller: LoaderController;
    #urlModifier: UrlModifier;
    #withCredentials: boolean;
    #requestHeaders: Headers;
    #crossOrigin: string;

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

    protected get withCredentials(): boolean {
        return this.#withCredentials;
    }
    protected set withCredentials(withCredentials: boolean) {
        this.#withCredentials = withCredentials;
    }

    protected get crossOrigin(): string {
        return this.#crossOrigin;
    }
    protected set crossOrigin(crossOrigin: string) {
        this.#crossOrigin = crossOrigin;
    }

    protected get requestHeaders(): Headers {
        return this.#requestHeaders;
    }
    protected set requestHeaders(requestHeaders: Headers) {
        this.#requestHeaders = requestHeaders;
    }

    constructor() {
        this.#initialParams();
    }

    #initialParams(): void {
        this.#controller = new LoaderController();
        this.urlModifier = undefined;
        this.withCredentials = false;
        this.crossOrigin = "anonymous";
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

    protected async fetch(url: string): Promise<Response | Error> {
        try {
            const req: Request = new Request(url, {
                headers: new Headers(this.requestHeaders),
                credentials: this.withCredentials ? "include" : "same-origin"
            });

            const response: Response = await fetch(req);

            return Promise.resolve(response);
        } catch(error) {
            return Promise.reject("failed to fetch from url with unknown message: " + error);
        }
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

    protected async handleResponseData(response: Response, responseType: ResponseType): Promise<ResponseData> {
        try {
            switch (responseType) {
                case "arraybuffer":
                    return Promise.resolve(response.arrayBuffer());
                case "blob":
                    return Promise.resolve(response.blob());
                case "json":
                    return Promise.resolve(response.json());
                default:
                    return Promise.resolve(response.text());
            }
        } catch(error) {
            return Promise.reject("failed to handle response data: " + error);
        }
    }
}
