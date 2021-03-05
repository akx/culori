import normalizeHue from '../util/normalizeHue';
import { HSIAValues, RGBColor } from '../types';

// Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB

export default function convertHsiToRgb({
	h,
	s,
	i,
	alpha
}: HSIAValues): RGBColor {
	h = normalizeHue(h);
	let f = Math.abs(((h / 60) % 2) - 1);
	let res: RGBColor;
	let mode = 'rgb' as const;
	switch (Math.floor(h / 60)) {
		case 0:
			res = {
				mode,
				r: i * (1 + s * (3 / (2 - f) - 1)),
				g: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1)),
				b: i * (1 - s)
			};
			break;
		case 1:
			res = {
				mode,
				r: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1)),
				g: i * (1 + s * (3 / (2 - f) - 1)),
				b: i * (1 - s)
			};
			break;
		case 2:
			res = {
				mode,
				r: i * (1 - s),
				g: i * (1 + s * (3 / (2 - f) - 1)),
				b: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1))
			};
			break;
		case 3:
			res = {
				mode,
				r: i * (1 - s),
				g: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1)),
				b: i * (1 + s * (3 / (2 - f) - 1))
			};
			break;
		case 4:
			res = {
				mode,
				r: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1)),
				g: i * (1 - s),
				b: i * (1 + s * (3 / (2 - f) - 1))
			};
			break;
		case 5:
			res = {
				mode,
				r: i * (1 + s * (3 / (2 - f) - 1)),
				g: i * (1 - s),
				b: i * (1 + s * ((3 * (1 - f)) / (2 - f) - 1))
			};
			break;
		default:
			res = { mode, r: i * (1 - s), g: i * (1 - s), b: i * (1 - s) };
	}

	if (alpha !== undefined) res.alpha = alpha;
	return res;
}
