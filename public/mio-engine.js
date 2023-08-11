class Renderer {
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
    #canvas;
    get gl() {
        return this.#canvas.getContext("webgl2");
    }
    constructor(parentId) {
        super();
        this.#initialParams();
        this.#initialCanvas(parentId);
    }
    #initialParams() {
        this.#canvas = new Canvas();
    }
    #initialCanvas(parentId) {
        const _parentId = parentId;
        if (!_parentId) {
            this.#canvas.appendToBody()
                .then((res) => {
                if (res) {
                    const parentNode = this.#canvas.node.parentElement;
                    this.#canvas.addEventListener("resize", () => {
                        this.#canvas.updateSize(parentNode.clientWidth, parentNode.clientHeight);
                    });
                }
            });
        }
        else {
            this.#canvas.appendToElement(_parentId)
                .then((res) => {
                if (res) {
                    const parentNode = this.#canvas.node.parentElement;
                    this.#canvas.addEventListener("resize", () => {
                        this.#canvas.updateSize(parentNode.clientWidth, parentNode.clientHeight);
                    });
                }
            });
        }
    }
}

console.log("MiO-Engine | Enjoy Coding!");

export { WebGL2Renderer };
//# sourceMappingURL=mio-engine.js.map
