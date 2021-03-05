// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation

import { HSIColor, RGBAValues } from '../types';
import { getH } from '../hsl/utils';

export default function convertRgbToHsi({
	r,
	g,
	b,
	alpha
}: RGBAValues): HSIColor {
	let M = Math.max(r, g, b),
		m = Math.min(r, g, b);
	let res: HSIColor = {
		mode: 'hsi',
		s: r + g + b === 0 ? 0 : 1 - (3 * m) / (r + g + b),
		i: (r + g + b) / 3,
		h: M - m !== 0 ? getH(r, g, b, m, M) : undefined
	};
	if (res.h === undefined) delete res.h;
	if (alpha !== undefined) res.alpha = alpha;
	return res;
}
