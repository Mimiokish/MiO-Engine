import { ResponseType, ResponseData } from "../declaration";

export class Loader {
    #prefix: string;
    #path: string;
    #url: string;
    #requestHeaders: Headers;
    #crossOrigin: string;

    protected get prefix(): string {
        return this.#prefix;
    }
    protected set prefix(prefix: string) {
        this.#prefix = prefix;
    }

    protected get path(): string {
        return this.#path;
    }
    protected set path(path: string) {
        this.#path = path;
    }

    protected get url(): string {
        return this.#url;
    }
    protected set url(url: string) {
        this.#url = url;
    }

    protected get requestHeaders(): Headers {
        return this.#requestHeaders;
    }
    protected set requestHeaders(requestHeaders: Headers) {
        this.#requestHeaders = requestHeaders;
    }

    protected get crossOrigin(): string {
        return this.#crossOrigin;
    }
    protected set crossOrigin(crossOrigin: string) {
        this.#crossOrigin = crossOrigin;
    }

    constructor() {
        this.#initialParams();
    }

    #initialParams(): void {
        this.crossOrigin = "anonymous";
        this.prefix = "";
        this.path = "";
        this.url = "";
    }

    resolveURL(): string {
        let _prefix: string = this.prefix || "";
        let _path: string = this.path || "";

        if (_prefix && _prefix.startsWith("/")) {
            _prefix = _prefix.slice(1);
        }

        if (_prefix && _prefix.endsWith("/")) {
            _prefix = _prefix.slice(0, -1);
        }

        if (_path && _path.startsWith("/")) {
            _path = _path.slice(1);
        }

        if (_prefix) {
            this.url = "/" + _prefix + "/" + _path;
        } else {
            this.url = "/" + _path;
        }

        return this.url;
    }

    /**
     * validate url
     * @param url
     */
    async load(url: string): Promise<ResponseData | boolean | Error> {
        try {
            this.path = url;

            if (!this.path) {
                return Promise.reject("url is required");
            }

            if (this.path.includes("https://")) {
                this.url = this.path;
            } else {
                this.url = this.resolveURL();
            }

            return Promise.resolve(true);
        } catch(error) {
            return Promise.reject("failed to parse url with unknown error: " + error);
        }
    }

    async fetch(): Promise<Response | Error> {
        try {
            const response: Response = await fetch(this.url, {
                headers: new Headers(this.requestHeaders)
            });

            return Promise.resolve(response);
        } catch(error) {
            return Promise.reject("failed to fetch from url with unknown error: " + error);
        }
    }

    async handleResponseStatus(response: Response): Promise<boolean | Error> {
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

    async handleResponseData(response: Response, responseType: ResponseType): Promise<ResponseData> {
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
