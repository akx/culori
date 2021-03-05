import normalizeHue from '../util/normalizeHue';
import { LABAValues, LCHAValues } from '../types';

/* 
	References: 
		* https://drafts.csswg.org/css-color/#lab-to-lch
		* https://drafts.csswg.org/css-color/#color-conversion-code
*/

function convertLabValuesToLchValues({
	l,
	a,
	b,
	alpha
}: LABAValues): LCHAValues {
	let c = Math.sqrt(a * a + b * b);
	const values = {
		l,
		c,
		h: c ? normalizeHue((Math.atan2(b, a) * 180) / Math.PI) : undefined,
		alpha
	};
	if (values.h === undefined) delete values.h;
	if (values.alpha === undefined) delete values.alpha;
	return values;
}

const convertLabToLch = (values: LABAValues, mode = 'lch') => {
	return {
		mode,
		...convertLabValuesToLchValues(values)
	};
};

export default convertLabToLch;
