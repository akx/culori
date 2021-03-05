import convertLrgbToRgb from '../lrgb/convertLrgbToRgb';
import convertOklabToLrgb from './convertOklabToLrgb';
import { LABAValues } from '../types';

const convertOklabToRgb = (c: LABAValues) =>
	convertLrgbToRgb(convertOklabToLrgb(c));

export default convertOklabToRgb;
