import { LCHUVColor, LUVColor } from '../types';

const convertLchuvToLuv = ({ l, c, h, alpha }: LCHUVColor): LUVColor => {
	let res: LUVColor = {
		mode: 'luv',
		l,
		u: c && h !== undefined ? c * Math.cos((h / 180) * Math.PI) : 0,
		v: c && h !== undefined ? c * Math.sin((h / 180) * Math.PI) : 0
	};
	if (alpha !== undefined) {
		res.alpha = alpha;
	}
	return res;
};

export default convertLchuvToLuv;
