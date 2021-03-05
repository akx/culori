import { degToRad, M } from './constants';
import { CubehelixAValues, RGBColor } from '../types';

const convertCubehelixToRgb = ({
	h,
	s,
	l,
	alpha
}: CubehelixAValues): RGBColor => {
	h = (h === undefined ? 0 : h + 120) * degToRad;

	let amp = s === undefined ? 0 : s * l * (1 - l);

	let cosh = Math.cos(h);
	let sinh = Math.sin(h);

	let res: RGBColor = {
		mode: 'rgb',
		r: l + amp * (M[0] * cosh + M[1] * sinh),
		g: l + amp * (M[2] * cosh + M[3] * sinh),
		b: l + amp * (M[4] * cosh + M[5] * sinh)
	};

	if (alpha !== undefined) res.alpha = alpha;
	return res;
};

export default convertCubehelixToRgb;
