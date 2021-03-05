import { kCH, kE, sinθ, cosθ, θ, factor } from './constants';
import { LAB65Color, LCHAValues } from '../types';

/*
	Convert DIN99o LCh to CIELab D65
	--------------------------------
 */

const convertDlchToLab65 = ({ l, c, h, alpha }: LCHAValues): LAB65Color => {
	let a, b;
	if (h === undefined) {
		a = b = 0;
	} else {
		let G = (Math.exp(0.0435 * c * kCH * kE) - 1) / 0.075;
		let e = G * Math.cos((h / 180) * Math.PI - θ);
		let f = G * Math.sin((h / 180) * Math.PI - θ);
		a = e * cosθ - (f / 0.83) * sinθ;
		b = e * sinθ + (f / 0.83) * cosθ;
	}
	let res: LAB65Color = {
		mode: 'lab65',
		l: (Math.exp((l * kE) / factor) - 1) / 0.0039,
		a,
		b
	};
	if (alpha !== undefined) res.alpha = alpha;
	return res;
};

export default convertDlchToLab65;
