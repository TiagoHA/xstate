import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import rollupReplace from 'rollup-plugin-replace';
import fileSize from 'rollup-plugin-filesize';

const createConfig = ({ input, output, target = undefined }) => ({
  input,
  output,
  plugins: [
    rollupReplace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    typescript({
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
          ...(target ? { target } : {})
        }
      }
    }),
    terser({
      toplevel: true
    }),
    fileSize()
  ]
});

export default [
  createConfig({
    input: 'src/index.ts',
    output: {
      file: 'dist/xstate.fsm.js',
      format: 'umd',
      name: 'XStateFSM'
    }
  })
];
