import { hwb } from '../util/regex';
import { hue } from '../util/hue';
import { HWBColor } from '../types';

const parseHwb = (color: string): HWBColor | undefined => {
	if (typeof color !== 'string') return undefined;
	let match = color.match(hwb);
	if (!match) return undefined;
	let res: HWBColor = {
		mode: 'hwb',
		h:
			match[3] === undefined
				? hue(parseFloat(match[1]), match[2])
				: +match[3],
		w: parseFloat(match[4]) / 100,
		b: parseFloat(match[5]) / 100
	};

	// normalize w + b to at most 1
	if (res.w + res.b > 1) {
		let s = res.w + res.b;
		res.w /= s;
		res.b /= s;
	}

	if (match[6] !== undefined) {
		res.alpha = parseFloat(match[6]) / 100;
	} else if (match[7] !== undefined) {
		res.alpha = parseFloat(match[7]) / 255;
	}
	return res;
};

export default parseHwb;
