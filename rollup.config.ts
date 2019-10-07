import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';

export default [
    {
        input: `src/index.ts`,
        output: [
            {
                name: 'coderr',
                file: 'dist/coderr.browser.js',
                format: 'iife',
            },
            { file: 'dist/coderr.browser.min.js', format: 'es', sourcemap: true },
            { file: 'dist/coderr.esm.js', format: 'es', sourcemap: true },
        ],
        plugins: [
            del({ targets: 'dist/*' }),
            typescript({ useTsconfigDeclarationDir: true }),
            commonjs(), // so Rollup can convert `ms` to an ES module
            resolve(), // so Rollup can find `ms`
            sourceMaps(),
        ],
    },
    {
        input: `src/index.ts`,
        output: [
            {
                file: 'dist/coderr.umd.js',
                name: 'aaa',
                format: 'umd',
                sourcemap: true,
            },
            { file: 'dist/coderr.umd.min.js', format: 'es', sourcemap: true },
        ],
        // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
        external: [],
        watch: {
            include: 'src/**',
        },
        plugins: [
            // Compile TypeScript files
            typescript({ useTsconfigDeclarationDir: true }),
            // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
            commonjs(),
            // Allow node_modules resolution, so you can use 'external' to control
            // which external modules to include in the bundle
            // https://github.com/rollup/rollup-plugin-node-resolve#usage
            resolve(),

            // Resolve source maps to the original source
            sourceMaps(),
        ],
    },
];
