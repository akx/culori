import convertLuvToXyz from './convertLuvToXyz';
import convertXyzToRgb from '../xyz/convertXyzToRgb';
import { LUVColor } from '../types';

const convertLuvToRgb = (luv: LUVColor) =>
	convertXyzToRgb(convertLuvToXyz(luv));

export default convertLuvToRgb;
