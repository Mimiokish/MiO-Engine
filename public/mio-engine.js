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
    #path;
    #responseType;
    #crossOrigin;
    get path() {
        return this.#path;
    }
    set path(path) {
        this.#path = path;
    }
    get responseType() {
        return this.#responseType;
    }
    set responseType(responseType) {
        this.#responseType = responseType;
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
        this.path = "";
    }
    load(url) {
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
    loadAsync() { }
    resolveURL(baseURL, relativeURL) {
        let _baseURL = baseURL;
        if (_baseURL.endsWith("/")) {
            _baseURL = _baseURL.slice(0, -1);
        }
        let _relativeURL = relativeURL;
        if (_relativeURL.startsWith("/")) {
            _relativeURL = _relativeURL.slice(1);
        }
        return _baseURL + "/" + _relativeURL;
    }
    handleResponseStatus(response) {
        if (!response.ok) {
            console.log("MiO Engine | Loader - failed to fetch from url");
            return Promise.reject(response);
        }
        if (response.status === 200) {
            return response;
        }
        else {
            console.log("MiO Engine | Loader - failed to fetch from url");
            return Promise.reject(response);
        }
    }
    handleResponseData(response) {
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

class GLTFLoader extends Loader {
    constructor() {
        super();
    }
    async load(url) {
        try {
            await super.load(url);
            const response = await fetch(this.path);
            console.log(3434, this.path);
            return Promise.resolve(null);
        }
        catch (error) {
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
    handleGLTF(data) {
        console.log(2323, data);
        return "pass";
    }
}

console.log("MiO-Engine | Enjoy Coding!");

export { GLTFLoader, WebGL2Renderer };
//# sourceMappingURL=mio-engine.js.map
