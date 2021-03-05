/*
	Convert CIE XYZ D65 values to Rec. 2020

	References:
		* https://drafts.csswg.org/css-color/#color-conversion-code
		* http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
		* https://www.itu.int/rec/R-REC-BT.2020/en
*/

import { Rec2020Color, XYZ65Color } from '../types';

const α = 1.09929682680944;
const β = 0.018053968510807;
const gamma = v => (v > β ? α * Math.pow(v, 1 / 2.4) - (α - 1) : 4.5 * v);

function convertXyz65ToRec2020({ x, y, z, alpha }: XYZ65Color): Rec2020Color {
	let res: Rec2020Color = {
		mode: 'rec2020',
		r: gamma(
			x * 1.7166511879712674 -
				y * 0.35567078377639233 -
				0.25336628137365974 * z
		),
		g: gamma(
			x * -0.6666843518324892 +
				y * 1.6164812366349395 +
				0.01576854581391113 * z
		),
		b: gamma(
			x * 0.017639857445310783 -
				y * 0.042770613257808524 +
				0.9421031212354738 * z
		)
	};
	if (alpha !== undefined) {
		res.alpha = alpha;
	}
	return res;
}

export default convertXyz65ToRec2020;
