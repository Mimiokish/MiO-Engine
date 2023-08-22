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
            console.log("MiO Engine | node append to body error: ", error);
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
            console.log("MiO Engine | node append to " + nodeId + " element error: ", error);
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

class Loader {
    #prefix;
    #path;
    #url;
    #requestHeaders;
    #crossOrigin;
    get prefix() {
        return this.#prefix;
    }
    set prefix(prefix) {
        this.#prefix = prefix;
    }
    get path() {
        return this.#path;
    }
    set path(path) {
        this.#path = path;
    }
    get url() {
        return this.#url;
    }
    set url(url) {
        this.#url = url;
    }
    get requestHeaders() {
        return this.#requestHeaders;
    }
    set requestHeaders(requestHeaders) {
        this.#requestHeaders = requestHeaders;
    }
    get crossOrigin() {
        return this.#crossOrigin;
    }
    set crossOrigin(crossOrigin) {
        this.#crossOrigin = crossOrigin;
    }
    constructor() {
        this.#initialParams();
    }
    #initialParams() {
        this.crossOrigin = "anonymous";
        this.prefix = "";
        this.path = "";
        this.url = "";
    }
    resolveURL() {
        let _prefix = this.prefix || "";
        let _path = this.path || "";
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
        }
        else {
            this.url = "/" + _path;
        }
        return this.url;
    }
    /**
     * validate url
     * @param url
     */
    async load(url) {
        try {
            this.path = url;
            if (!this.path) {
                return Promise.reject("url is required");
            }
            if (this.path.includes("https://")) {
                this.url = this.path;
            }
            else {
                this.url = this.resolveURL();
            }
            return Promise.resolve(true);
        }
        catch (error) {
            return Promise.reject("failed to parse url with unknown error: " + error);
        }
    }
    async fetch() {
        try {
            const response = await fetch(this.url, {
                headers: new Headers(this.requestHeaders)
            });
            return Promise.resolve(response);
        }
        catch (error) {
            return Promise.reject("failed to fetch from url with unknown error: " + error);
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
            await super.load(url);
            const response = await super.fetch();
            if (response instanceof Response) {
                await super.handleResponseStatus(response);
                const data = await super.handleResponseData(response, "json");
                if (data) {
                    console.log("MiO Engine | GLTFLoader - fetch success: ", response);
                    console.log("MiO Engine | GLTFLoader - file load success: ", data);
                    return Promise.resolve(data);
                }
            }
            console.error(new Error("MiO Engine | GLTFLoader - file load failed: unknown"));
            return Promise.resolve(false);
        }
        catch (error) {
            console.error(new Error("MiO Engine | GLTFLoader - file load failed: " + error));
            return Promise.resolve(false);
        }
    }
    handleGLTF(data) {
        console.log(2323, data);
        return "pass";
    }
}

console.log("MiO-Engine | Enjoy Coding!");

export { GLTFLoader, WebGL2Renderer };
//# sourceMappingURL=mio-engine.js.map
