/*
	Convert sRGB to JzAzBz.

	For achromatic sRGB colors, adjust the equivalent JzAzBz color
	to be achromatic as well, insteading of having a very slight chroma.
 */

import convertXyz65ToJab from './convertXyz65ToJab';
import convertRgbToXyz65 from '../xyz65/convertRgbToXyz65';
import { RGBColor } from '../types';

const convertRgbToJab = (rgb: RGBColor) => {
	let res = convertXyz65ToJab(convertRgbToXyz65(rgb));
	if (rgb.r === rgb.b && rgb.b === rgb.g) {
		res.a = res.b = 0;
	}
	return res;
};

export default convertRgbToJab;
