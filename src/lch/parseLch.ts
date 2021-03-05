import { lch } from '../util/regex';
import { hue } from '../util/hue';
import { LCHColor } from '../types';

const parseLch = (color: string): LCHColor | undefined => {
	if (typeof color !== 'string') return undefined;

	let match = color.match(lch);

	if (!match) {
		return undefined;
	}

	let res: LCHColor = {
		mode: 'lch',
		l: +match[1],
		c: Math.max(0, +match[2]),
		h:
			match[5] === undefined
				? hue(parseFloat(match[3]), match[4])
				: +match[5]
	};

	if (match[6] !== undefined) {
		res.alpha = parseFloat(match[6]) / 100;
	} else if (match[7] !== undefined) {
		res.alpha = parseFloat(match[7]);
	}

	return res;
};

export default parseLch;
