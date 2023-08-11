export type WebGLContext =
    | WebGLRenderingContext
    | WebGL2RenderingContext

export type WebGLContextType =
    | "webgl"
    | "webgl2"

export type WebGLAttributes = {
    gl: WebGLContext;
}
