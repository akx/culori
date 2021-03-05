/*
	Cosine interpolation
	--------------------

	Reference: 

		http://paulbourke.net/miscellaneous/interpolation/
 */

import lerp from './lerp';
import easeInOutSine from '../easing/inOutSine';
import gamma from '../easing/gamma';
import { interpolatorPiecewise } from './piecewise';
import { identity } from '../utils';

// @deprecated
function cosine(fixup, γ = 1) {
	const ease = gamma(γ);
	fixup = fixup || identity;
	return (arr: number[]) => {
		const interpolator = interpolatorPiecewise<number>((a, b, t) =>
			lerp(a, b, easeInOutSine(t))
		)(fixup(arr));
		return t => interpolator(ease(t));
	};
}

export default cosine;
