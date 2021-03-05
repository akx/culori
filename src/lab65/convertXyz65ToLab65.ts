import { Xn, Yn, Zn, k, e } from '../xyz65/constants';
import { LAB65Color, XYZ65Color } from '../types';

const f = value => (value > e ? Math.cbrt(value) : (k * value + 16) / 116);

const convertXyz65ToLab65 = ({ x, y, z, alpha }: XYZ65Color): LAB65Color => {
	let f0 = f(x / Xn);
	let f1 = f(y / Yn);
	let f2 = f(z / Zn);

	let res: LAB65Color = {
		mode: 'lab65',
		l: 116 * f1 - 16,
		a: 500 * (f0 - f1),
		b: 200 * (f1 - f2)
	};

	if (alpha !== undefined) {
		res.alpha = alpha;
	}

	return res;
};

export default convertXyz65ToLab65;
