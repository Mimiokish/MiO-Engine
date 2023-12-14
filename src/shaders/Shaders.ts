export class Shaders {
    #key: string;
    #type: number;
    #source: string;
    #gl: WebGL2RenderingContext;
    #shader: WebGLShader;

    constructor(key: string, type: number, source: string, gl: WebGL2RenderingContext) {
        const _key: string = key;
        const _type: number = type;
        const _source: string = source;
        const _gl: WebGL2RenderingContext = gl;

        this.#initialParams(_key, _type, _source, _gl);
        this.#initialShader();
    }

    #initialParams(key: string, type: number, source: string, gl: WebGL2RenderingContext): void {
        this.#key = key;
        this.#type = type;
        this.#source = source;
        this.#gl = gl;
    }

    #initialShader(): void {
        if (!this.#gl) {
            throw new Error("MiO Engine | WebGL2RenderingContext is undefined");
        }

        if (!this.#type) {
            throw new Error("MiO Engine | type is undefined");
        }

        if (!this.#source) {
            throw new Error("MiO Engine | source is undefined");
        }

        const shader: WebGLShader | null = this.#gl.createShader(this.#type);
        if (!shader) {
            throw new Error("MiO Engine | shader is null");
        } else {
            this.#gl.shaderSource(shader, this.#source);
            this.#gl.compileShader(shader);

            const error: string | null = this.#gl.getShaderInfoLog(shader);

            if (error) {
                throw new Error("MiO Engine | shader compile error: " + error);
            } else {
                this.#shader = shader;
            }
        }
    }

    public getShader(): WebGLShader {
        return this.#shader;
    }
}
