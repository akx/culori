import parse from './parse';
import { Color } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prepare = (color: any, mode?: string): Color | undefined =>
	color === undefined
		? undefined
		: typeof color !== 'object'
		? parse(color)
		: color.mode !== undefined
		? color
		: mode
		? { ...color, mode }
		: undefined;

export default prepare;
