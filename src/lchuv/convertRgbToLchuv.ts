import convertRgbToLuv from '../luv/convertRgbToLuv';
import convertLuvToLchuv from './convertLuvToLchuv';
import { RGBColor } from '../types';

const convertRgbToLchuv = (c: RGBColor) =>
	convertLuvToLchuv(convertRgbToLuv(c));

export default convertRgbToLchuv;
