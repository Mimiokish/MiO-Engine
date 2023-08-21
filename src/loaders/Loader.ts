export class Loader {
    #path: string;
    #responseType: string;
    #crossOrigin: string;

    protected get path(): string {
        return this.#path;
    }
    protected set path(path: string) {
        this.#path = path;
    }

    protected get responseType(): string {
        return this.#responseType;
    }
    protected set responseType(responseType: string) {
        this.#responseType = responseType;
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
        this.path = "";
    }

    load(url: string): void | Promise<Error> {
        this.path = url;

        if (!this.path) {
            console.error("MiO Engine | GLTFLoader - url is required");
            return Promise.reject(new Error("MiO Engine | GLTFLoader - url is required"));
        }
        console.log(7788899);

        if (!this.path.includes("https://")) {
            this.path = this.resolveURL(window.location.host, this.path);
        }
    }

    loadAsync() {}

    resolveURL(baseURL: string, relativeURL: string): string {
        let _baseURL: string = baseURL;
        if (_baseURL.endsWith("/")) {
            _baseURL = _baseURL.slice(0, -1);
        }

        let _relativeURL: string = relativeURL;
        if (_relativeURL.startsWith("/")) {
            _relativeURL = _relativeURL.slice(1);
        }

        return _baseURL + "/" + _relativeURL;
    }

    handleResponseStatus(response: Response): Response | Promise<Response> {
        if (!response.ok) {
            console.log("MiO Engine | Loader - failed to fetch from url");
            return Promise.reject(response);
        }

        if (response.status === 200) {
            return response;
        } else {
            console.log("MiO Engine | Loader - failed to fetch from url");
            return Promise.reject(response);
        }
    }

    handleResponseData(response: Response): Promise<ArrayBuffer | Blob | JSON | string> {
        switch (this.responseType) {
            case "arraybuffer":
                return response.arrayBuffer();
            case "blob":
                return response.blob();
            case "json":
                return response.json();
            default:
                return response.text();
        }
    }
}
