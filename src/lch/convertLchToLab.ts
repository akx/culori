/* 
	References: 
		* https://drafts.csswg.org/css-color/#lch-to-lab
		* https://drafts.csswg.org/css-color/#color-conversion-code
*/
import { LABAValues, LCHAValues } from '../types';

function convertLchValuesToLabValues({
	l,
	c,
	h,
	alpha
}: LCHAValues): LABAValues {
	const values = {
		l,
		a: c && h !== undefined ? c * Math.cos((h / 180) * Math.PI) : 0,
		b: c && h !== undefined ? c * Math.sin((h / 180) * Math.PI) : 0,
		alpha
	};
	if (values.alpha === undefined) delete values.alpha;
	return values;
}
const convertLchToLab = (values: LCHAValues, mode: string = 'lab') => {
	return {
		mode,
		...convertLchValuesToLabValues(values)
	};
};

export default convertLchToLab;
