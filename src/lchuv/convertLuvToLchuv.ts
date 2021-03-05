import normalizeHue from '../util/normalizeHue';
import { LCHUVColor, LUVColor } from '../types';

const convertLuvToLchuv = ({ l, u, v, alpha }: LUVColor): LCHUVColor => {
	let c = Math.sqrt(u * u + v * v);
	let res: LCHUVColor = {
		mode: 'lchuv',
		l,
		c,
		h: c ? normalizeHue((Math.atan2(v, u) * 180) / Math.PI) : undefined
	};
	if (res.h === undefined) {
		delete res.h;
	}
	if (alpha !== undefined) {
		res.alpha = alpha;
	}
	return res;
};

export default convertLuvToLchuv;
