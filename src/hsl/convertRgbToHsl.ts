// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation

import { HSLColor, RGBAValues } from '../types';
import { getH } from './utils';

export default function convertRgbToHsl({
	r,
	g,
	b,
	alpha
}: RGBAValues): HSLColor {
	let M = Math.max(r, g, b),
		m = Math.min(r, g, b);
	let res: HSLColor = {
		mode: 'hsl',
		s: M === m ? 0 : (M - m) / (1 - Math.abs(M + m - 1)),
		l: 0.5 * (M + m),
		h: M - m !== 0 ? getH(r, g, b, m, M) : undefined
	};
	if (res.h === undefined) delete res.h;
	if (alpha !== undefined) res.alpha = alpha;
	return res;
}
