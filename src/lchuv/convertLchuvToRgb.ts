import convertLuvToRgb from '../luv/convertLuvToRgb';
import { LCHUVColor, RGBColor } from '../types';
import convertLchuvToLuv from './convertLchuvToLuv';

function convertLchuvToRgb(c: LCHUVColor): RGBColor {
	return convertLuvToRgb(convertLchuvToLuv(c));
}

export default convertLchuvToRgb;
