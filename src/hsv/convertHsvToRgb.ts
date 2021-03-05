import normalizeHue from '../util/normalizeHue';
import { HSVAValues, RGBColor } from '../types';

// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB

export default function convertHsvToRgb({
	h,
	s,
	v,
	alpha
}: HSVAValues): RGBColor {
	h = normalizeHue(h);
	let f = Math.abs(((h / 60) % 2) - 1);
	const mode = 'rgb' as const;
	let res: RGBColor;
	let v1s = v * (1 - s);
	switch (Math.floor(h / 60)) {
		case 0:
			res = { mode, r: v, g: v * (1 - s * f), b: v1s };
			break;
		case 1:
			res = { mode, r: v * (1 - s * f), g: v, b: v1s };
			break;
		case 2:
			res = { mode, r: v1s, g: v, b: v * (1 - s * f) };
			break;
		case 3:
			res = { mode, r: v1s, g: v * (1 - s * f), b: v };
			break;
		case 4:
			res = { mode, r: v * (1 - s * f), g: v1s, b: v };
			break;
		case 5:
			res = { mode, r: v, g: v1s, b: v * (1 - s * f) };
			break;
		default:
			res = { mode, r: v1s, g: v1s, b: v1s };
	}
	if (alpha !== undefined) res.alpha = alpha;
	return res;
}
