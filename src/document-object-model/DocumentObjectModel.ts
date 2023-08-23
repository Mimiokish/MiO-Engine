import { HTMLTagName, HTMLNode } from "../declaration";

export class DocumentObjectModel {
    #node: HTMLNode;

    public get node(): HTMLNode {
        return this.#node;
    }
    public set node(value: HTMLNode) {
        throw new Error("MiO Engine | node is readonly");
    }

    constructor(tagName: HTMLTagName) {
        this.#initialParams(tagName);
    }

    #initialParams(tagName: HTMLTagName): void {
        const _tagName: HTMLTagName = tagName;
        if (!_tagName) {
            this.#node = document.createElement("div");
        } else {
            this.#node = document.createElement(_tagName);
        }
    }

    async appendToBody(): Promise<boolean> {
        try {
            if (!this.#node) {
                console.log("MiO Engine | node is not found");
                return Promise.resolve(false);
            }

            if (document.readyState === "complete") {
                document.body.appendChild(this.#node);
                return Promise.resolve(true);
            } else {
                return new Promise<boolean>((resolve): void => {
                    const eventFn = (): void => {
                        document.body.appendChild(this.#node);
                        document.removeEventListener("DOMContentLoaded", eventFn);
                        resolve(true);
                    };

                    document.addEventListener("DOMContentLoaded", eventFn);
                });
            }
        } catch (error) {
            console.log("MiO Engine | node append to body message: ", error);
            return Promise.resolve(false);
        }
    }

    async appendToElement(nodeId: string): Promise<boolean> {
        try {
            const _nodeId: string = nodeId;
            if (!_nodeId) {
                console.log("MiO Engine | nodeId is needed");
                return Promise.resolve(false);
            }

            if (!this.#node) {
                console.log("MiO Engine | node is not found");
                return Promise.resolve(false);
            }

            if (document.readyState === "complete") {
                const nodeParent: HTMLElement | null = document.getElementById(_nodeId);
                if (!nodeParent) {
                    console.log("MiO Engine | parent node with id " + _nodeId + " is not found");
                    return Promise.resolve(false);
                }

                nodeParent.appendChild(this.#node);
                return Promise.resolve(true);
            } else {
                return new Promise<boolean>((resolve): void => {
                    const eventFn = (): void => {
                        if (this.#node) {
                            const nodeParent: HTMLElement | null = document.getElementById(_nodeId);
                            if (!nodeParent) {
                                console.log("MiO Engine | parent node with id " + _nodeId + " is not found");
                                resolve(false);
                            } else {
                                nodeParent.appendChild(this.#node);

                                document.removeEventListener("DOMContentLoaded", eventFn);
                                resolve(true);
                            }
                        }
                    };

                    document.addEventListener("DOMContentLoaded", eventFn);
                });
            }

        } catch (error) {
            console.log("MiO Engine | node append to " + nodeId + " element message: ", error);
            return Promise.resolve(false);
        }
    }
}
