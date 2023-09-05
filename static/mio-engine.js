class Renderer {
    #type;
    #target;
    get type() {
        return this.#type;
    }
    set type(type) {
        this.#type = type;
    }
    get target() {
        return this.#target;
    }
    set target(target) {
        this.#target = target;
    }
    constructor() {
        this.type = "";
        this.target = null;
    }
}

class DocumentObjectModel {
    #node;
    get node() {
        return this.#node;
    }
    set node(value) {
        throw new Error("MiO Engine | node is readonly");
    }
    constructor(tagName) {
        this.#initialParams(tagName);
    }
    #initialParams(tagName) {
        const _tagName = tagName;
        if (!_tagName) {
            this.#node = document.createElement("div");
        }
        else {
            this.#node = document.createElement(_tagName);
        }
    }
    async appendToBody() {
        try {
            if (!this.#node) {
                console.log("MiO Engine | node is not found");
                return Promise.resolve(false);
            }
            if (document.readyState === "complete") {
                document.body.appendChild(this.#node);
                return Promise.resolve(true);
            }
            else {
                return new Promise((resolve) => {
                    const eventFn = () => {
                        document.body.appendChild(this.#node);
                        document.removeEventListener("DOMContentLoaded", eventFn);
                        resolve(true);
                    };
                    document.addEventListener("DOMContentLoaded", eventFn);
                });
            }
        }
        catch (error) {
            console.log("MiO Engine | node append to body message: ", error);
            return Promise.resolve(false);
        }
    }
    async appendToElement(nodeId) {
        try {
            const _nodeId = nodeId;
            if (!_nodeId) {
                console.log("MiO Engine | nodeId is needed");
                return Promise.resolve(false);
            }
            if (!this.#node) {
                console.log("MiO Engine | node is not found");
                return Promise.resolve(false);
            }
            if (document.readyState === "complete") {
                const nodeParent = document.getElementById(_nodeId);
                if (!nodeParent) {
                    console.log("MiO Engine | parent node with id " + _nodeId + " is not found");
                    return Promise.resolve(false);
                }
                nodeParent.appendChild(this.#node);
                return Promise.resolve(true);
            }
            else {
                return new Promise((resolve) => {
                    const eventFn = () => {
                        if (this.#node) {
                            const nodeParent = document.getElementById(_nodeId);
                            if (!nodeParent) {
                                console.log("MiO Engine | parent node with id " + _nodeId + " is not found");
                                resolve(false);
                            }
                            else {
                                nodeParent.appendChild(this.#node);
                                document.removeEventListener("DOMContentLoaded", eventFn);
                                resolve(true);
                            }
                        }
                    };
                    document.addEventListener("DOMContentLoaded", eventFn);
                });
            }
        }
        catch (error) {
            console.log("MiO Engine | node append to " + nodeId + " element message: ", error);
            return Promise.resolve(false);
        }
    }
}

class Canvas extends DocumentObjectModel {
    get node() {
        return super.node;
    }
    constructor() {
        super("canvas");
    }
    getContext(type) {
        return this.node.getContext(type);
    }
    updateSize(width, height) {
        this.node.width = width;
        this.node.height = height;
    }
    addEventListener(type, fn, ...args) {
        window.addEventListener(type, () => {
            fn.call(null, ...args);
        });
    }
}

class WebGL2Renderer extends Renderer {
    get canvas() {
        return this.target;
    }
    set canvas(canvas) {
        throw new Error("MiO Engine | WebGL2Renderer - canvas cannot be set");
    }
    get context() {
        return this.canvas.getContext("webgl2");
    }
    set context(context) {
        throw new Error("MiO Engine | WebGL2Renderer - gl cannot be set");
    }
    constructor(parentId) {
        super();
        // initial methods
        this.#initialParams();
        this.#initialCanvas(parentId);
    }
    #initialParams() {
        this.type = "WebGL2";
        this.target = new Canvas();
    }
    #initialCanvas(parentId) {
        const _parentId = parentId;
        if (!_parentId) {
            this.canvas.appendToBody()
                .then((res) => {
                if (res) {
                    const parentNode = this.canvas.node.parentElement;
                    this.canvas.addEventListener("resize", () => {
                        this.canvas.updateSize(parentNode.clientWidth, parentNode.clientHeight);
                    });
                }
            });
        }
        else {
            this.canvas.appendToElement(_parentId)
                .then((res) => {
                if (res) {
                    const parentNode = this.canvas.node.parentElement;
                    this.canvas.addEventListener("resize", () => {
                        this.canvas.updateSize(parentNode.clientWidth, parentNode.clientHeight);
                    });
                }
            });
        }
    }
}

class LoaderController {
    #status;
    #queue;
    constructor() {
        this.#initialParams();
    }
    #initialParams() {
        this.#status = "idle";
    }
    get status() {
        return this.#status;
    }
    set status(status) {
        this.#status = status;
    }
    get queue() {
        return this.#queue;
    }
    set queue(queue) {
        throw new Error("MiO Engine | LoaderController - queue is readonly");
    }
    set(key, type) {
        const _key = key;
        if (!_key) {
            console.error(new Error("MiO Engine | LoaderController - set failed: key is required"));
            return;
        }
        this.#queue.set(_key, type);
    }
    delete(url) {
        this.#queue.delete(url);
    }
}

class Loader {
    #controller;
    #urlModifier;
    #withCredentials;
    #requestHeaders;
    #crossOrigin;
    get controller() {
        return this.#controller;
    }
    set controller(controller) {
        throw new Error("MiO Engine | Loader - controller is readonly");
    }
    get urlModifier() {
        return this.#urlModifier;
    }
    set urlModifier(urlModifier) {
        this.#urlModifier = urlModifier;
    }
    get withCredentials() {
        return this.#withCredentials;
    }
    set withCredentials(withCredentials) {
        this.#withCredentials = withCredentials;
    }
    get crossOrigin() {
        return this.#crossOrigin;
    }
    set crossOrigin(crossOrigin) {
        this.#crossOrigin = crossOrigin;
    }
    get requestHeaders() {
        return this.#requestHeaders;
    }
    set requestHeaders(requestHeaders) {
        this.#requestHeaders = requestHeaders;
    }
    constructor() {
        this.#initialParams();
    }
    #initialParams() {
        this.#controller = new LoaderController();
        this.urlModifier = undefined;
        this.withCredentials = false;
        this.crossOrigin = "anonymous";
    }
    resolveURL(url) {
        const _url = url;
        if (!_url) {
            console.error(new Error("MiO Engine | Loader - resolveURL failed: url is required"));
            return "";
        }
        if (this.urlModifier) {
            return this.urlModifier(_url);
        }
        return _url;
    }
    async fetch(url) {
        try {
            const req = new Request(url, {
                headers: new Headers(this.requestHeaders),
                credentials: this.withCredentials ? "include" : "same-origin"
            });
            const response = await fetch(req);
            return Promise.resolve(response);
        }
        catch (error) {
            return Promise.reject("failed to fetch from url with unknown message: " + error);
        }
    }
    async handleResponseStatus(response) {
        try {
            if (!response.ok) {
                return Promise.reject("failed to fetch from url");
            }
            if (response.status !== 200) {
                return Promise.reject("response status " + response.status + " received");
            }
            return Promise.resolve(true);
        }
        catch (error) {
            return Promise.reject("failed to handle response status: " + error);
        }
    }
    async handleResponseData(response, responseType) {
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
        }
        catch (error) {
            return Promise.reject("failed to handle response data: " + error);
        }
    }
}

class GLTFLoader extends Loader {
    constructor() {
        super();
        this.#initialParams();
    }
    #initialParams() {
        this.crossOrigin = "anonymous";
    }
    async load(url) {
        try {
            const _url = this.resolveURL(url);
            const res = await super.fetch(_url);
            if (res instanceof Response) {
                const cfgGltf = await res.json();
                const path = _url.split("/").slice(0, -1).join("/");
                console.log(111, cfgGltf);
                const indexBufferView = 0;
                const bufferView = cfgGltf.bufferViews[indexBufferView];
                console.log(333, bufferView);
                if (bufferView) {
                    // get current buffer info
                    const indexBuffer = bufferView.buffer;
                    const byteOffset = bufferView.byteOffset;
                    const byteLength = bufferView.byteLength;
                    // get current buffer data
                    const buffer = cfgGltf.buffers[indexBuffer];
                    const bufferUri = buffer.uri;
                    const resBin = await super.fetch(path + "/" + bufferUri);
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
        }
        catch (error) {
            console.error(new Error("MiO Engine | GLTFLoader - file load failed: " + error));
            return Promise.resolve(false);
        }
    }
}

console.log("MiO-Engine | Enjoy Coding!");

export { GLTFLoader, WebGL2Renderer };
//# sourceMappingURL=mio-engine.js.map
