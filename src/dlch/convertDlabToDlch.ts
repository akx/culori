import normalizeHue from '../util/normalizeHue';
import { DLCHColor, LABAValues } from '../types';

const convertDlabToDlch = ({ l, a, b, alpha }: LABAValues): DLCHColor => {
	let c = Math.sqrt(a * a + b * b);
	let res: DLCHColor = {
		mode: 'dlch',
		l: l,
		c: c,
		h: c ? normalizeHue((Math.atan2(b, a) * 180) / Math.PI) : undefined
	};
	if (res.h === undefined) delete res.h;
	if (alpha !== undefined) res.alpha = alpha;
	return res;
};

export default convertDlabToDlch;
