import convertRgbToXyz from '../xyz/convertRgbToXyz';
import convertXyzToLuv from './convertXyzToLuv';
import { RGBColor } from '../types';

const convertRgbToLuv = (rgb: RGBColor) =>
	convertXyzToLuv(convertRgbToXyz(rgb));

export default convertRgbToLuv;
