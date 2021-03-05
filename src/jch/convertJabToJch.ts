import normalizeHue from '../util/normalizeHue';
import { JABAValues, JCHColor } from '../types';

const convertJabToJch = ({ j, a, b, alpha }: JABAValues): JCHColor => {
	let c = Math.sqrt(a * a + b * b);
	let res: JCHColor = {
		mode: 'jch',
		j,
		c,
		h: c ? normalizeHue((Math.atan2(b, a) * 180) / Math.PI) : undefined
	};
	if (alpha !== undefined) {
		res.alpha = alpha;
	}
	return res;
};

export default convertJabToJch;
