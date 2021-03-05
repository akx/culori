import { hsl_old, hsl_new } from '../util/regex';
import { hue } from '../util/hue';
import { HSLColor } from '../types';

const parseHsl = (color: string): HSLColor | undefined => {
	if (typeof color !== 'string') return undefined;
	let match = color.match(hsl_old) || color.match(hsl_new);
	if (!match) return undefined;
	let res: HSLColor = {
		mode: 'hsl',
		h:
			match[3] === undefined
				? hue(parseFloat(match[1]), match[2])
				: +match[3],
		s: Math.min(Math.max(0, parseFloat(match[4]) / 100), 1),
		l: Math.min(Math.max(0, parseFloat(match[5]) / 100), 1)
	};
	if (match[6] !== undefined) {
		res.alpha = parseFloat(match[6]) / 100;
	} else if (match[7] !== undefined) {
		res.alpha = parseFloat(match[7]) / 255;
	}
	return res;
};

export default parseHsl;
