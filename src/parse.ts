import { parsers } from './modes';
import { Color } from './types';

function parse(color: string): Color | undefined {
	for (let i = 0; i < parsers.length; i++) {
		let result = parsers[i](color);
		if (result !== undefined) return result;
	}
	return undefined;
}

export default parse;
