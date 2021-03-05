import { lab } from '../util/regex';
import { LABColor } from '../types';

const parseLab = (color: string): LABColor | undefined => {
	if (typeof color !== 'string') {
		return undefined;
	}

	let match = color.match(lab);
	if (!match) {
		return undefined;
	}

	let res: LABColor = {
		mode: 'lab',
		l: +match[1],
		a: +match[2],
		b: +match[3]
	};

	if (match[4] !== undefined) {
		res.alpha = parseFloat(match[4]) / 100;
	} else if (match[5] !== undefined) {
		res.alpha = +match[5];
	}

	return res;
};

export default parseLab;
