import lerp from './lerp';
import gamma from '../easing/gamma';
import { interpolatorPiecewise } from './piecewise';
import { identity } from '../utils';

const interpolatorLinear = interpolatorPiecewise(lerp);

function interpolateLinear(fixup, γ = 1) {
	let ease = gamma(γ);
	fixup = fixup || identity;
	return arr => {
		return t => interpolatorLinear(fixup(arr))(ease(t));
	};
}

export {
	interpolatorLinear,
	// legacy
	interpolateLinear
};
