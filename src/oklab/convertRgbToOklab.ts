import convertRgbToLrgb from '../lrgb/convertRgbToLrgb';
import convertLrgbToOklab from './convertLrgbToOklab';
import { OklabColor, RGBColor } from '../types';

const convertRgbToOklab = (rgb: RGBColor): OklabColor => {
	let res = convertLrgbToOklab(convertRgbToLrgb(rgb));
	if (rgb.r === rgb.b && rgb.b === rgb.g) {
		res.a = res.b = 0;
	}
	return res;
};

export default convertRgbToOklab;
