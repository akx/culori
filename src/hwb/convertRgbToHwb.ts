/*
	RGB to HWB converter
	--------------------

	References:
		* https://drafts.csswg.org/css-color/#hwb-to-rgb
		* https://en.wikipedia.org/wiki/HWB_color_model
		* http://alvyray.com/Papers/CG/HWB_JGTv208.pdf
 */

import convertRgbToHsv from '../hsv/convertRgbToHsv';
import { HWBColor, RGBColor } from '../types';

export default function convertRgbToHwb(rgba: RGBColor): HWBColor {
	let { alpha, h, s, v } = convertRgbToHsv(rgba);
	let res: HWBColor = {
		mode: 'hwb',
		w: (1 - s) * v,
		b: 1 - v,
		h
	};
	if (alpha !== undefined) res.alpha = alpha;
	return res;
}
