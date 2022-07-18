import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import static_files from 'rollup-plugin-static-files'

const packageJson = require('./package.json');

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                name: 'react-accounting-textfield',
                exports: 'named'
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
                exports: 'named'
            }
        ],
        plugins: [
            external(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser(),
            
        ],
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: "esm" }],
        plugins: [
            dts(), 
            static_files({
                include: ['./public'],
            })
        ],
    },
]
