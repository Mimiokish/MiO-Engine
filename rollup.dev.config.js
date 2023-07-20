import plugin_babel from '@rollup/plugin-babel'
import plugin_typescript from '@rollup/plugin-typescript'
import plugin_eslint from '@rollup/plugin-eslint'
import plugin_serve from 'rollup-plugin-serve'

export default {
    input: 'src/index.ts',
    output: {
        name: 'MiO-Engine',
        file: 'public/mio-engine.js',
        format: 'es',
        sourcemap: true
    },
    plugins: [
        plugin_typescript({
            tsconfig: 'tsconfig.json'
        }),
        plugin_eslint({
            include: ['src/**/*.ts'],
            exclude: [
                'node_modules/**',
                'dev/**'
            ]
        }),
        plugin_babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        }),
        plugin_serve({
            contentBase: './public'
        })
    ]
}
