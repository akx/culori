// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation

import { HSVColor, RGBAValues } from '../types';
import { getH } from '../hsl/utils';

export default function convertRgbToHsv({
	r,
	g,
	b,
	alpha
}: RGBAValues): HSVColor {
	let M = Math.max(r, g, b),
		m = Math.min(r, g, b);
	let res: HSVColor = {
		mode: 'hsv',
		s: M === 0 ? 0 : 1 - m / M,
		v: M,
		h: M - m !== 0 ? getH(r, g, b, m, M) : undefined
	};
	if (res.h === undefined) delete res.h;
	if (alpha !== undefined) res.alpha = alpha;
	return res;
}
