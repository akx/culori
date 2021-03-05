import buble from '@rollup/plugin-buble';
import typescript from '@rollup/plugin-typescript';

import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
	// UMD, minified
	{
		input: 'src/index.ts',
		output: {
			file: pkg.main,
			format: 'umd',
			name: 'culori'
		},
		plugins: [
			typescript(),
			buble({ objectAssign: 'Object.assign' }),
			terser()
		]
	},

	// ES6 modules
	{
		input: 'src/index.ts',
		output: {
			file: pkg.module,
			format: 'es'
		},
		plugins: [typescript(), buble({ objectAssign: 'Object.assign' })]
	}
];
