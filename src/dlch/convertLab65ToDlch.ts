import { kCH, kE, sinθ, cosθ, θ, factor } from './constants';
import normalizeHue from '../util/normalizeHue';
import { DLCHColor, LABAValues } from '../types';

/*
	Convert CIELab D65 to DIN99o LCh
	================================
 */

const convertLab65ToDlch = ({ l, a, b, alpha }: LABAValues): DLCHColor => {
	let e = a * cosθ + b * sinθ;
	let f = 0.83 * (b * cosθ - a * sinθ);
	let G = Math.sqrt(e * e + f * f);
	let res: DLCHColor = {
		mode: 'dlch',
		l: (factor / kE) * Math.log(1 + 0.0039 * l),
		c: Math.log(1 + 0.075 * G) / (0.0435 * kCH * kE),
		h: undefined
	};

	if (res.c) {
		res.h = normalizeHue(((Math.atan2(f, e) + θ) / Math.PI) * 180);
	} else {
		delete res.h;
	}

	if (alpha !== undefined) res.alpha = alpha;
	return res;
};

export default convertLab65ToDlch;
