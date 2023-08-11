import * as MiOEngine from "./mio-engine.js";

console.log(111, MiOEngine);

const renderer = new MiOEngine.WebGL2Renderer("MiO-Engine");

console.log(222, renderer.gl);
