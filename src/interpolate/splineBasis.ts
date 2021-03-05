import gamma from '../easing/gamma';
import { SimpleInterpolator } from './utils';
import { identity } from '../utils';

/*
	Basis spline
	------------

	Given control points V0...Vn (our values)

		S0 = V0
		...
		Si = 1/6 * Vi-1 + 2/3 * Vi + 1/6 * Vi+1
		...
		Sn = Vn

	The Bézier curve has control points:

		Bi = Si-1, 2/3 * Vi-1 + 1/3 * Vi, 1/3 * Vi-1 + 2/3 * Vi, Si

	Which we can then factor into the Bezier's explicit form:
	
		B(t) = (1-t)^3 * P0 + 3 * (1-t)^2 * t * P1 + (1-t) * t^2 * P2 + t^3 * P3 

 */

const bspline = (
	Vim2: number,
	Vim1: number,
	Vi: number,
	Vip1: number,
	t: number
) => {
	let t2 = t * t;
	let t3 = t2 * t;
	return (
		((1 - 3 * t + 3 * t2 - t3) * Vim2 +
			(4 - 6 * t2 + 3 * t3) * Vim1 +
			(1 + 3 * t + 3 * t2 - 3 * t3) * Vi +
			t3 * Vip1) /
		6
	);
};

function interpolatorSplineBasis(arr: number[]): SimpleInterpolator {
	let classes = arr.length - 1;
	return (t: number) => {
		let i = t === 1 ? classes - 1 : Math.floor(t * classes);
		return bspline(
			i > 0 ? arr[i - 1] : 2 * arr[i] - arr[i + 1],
			arr[i],
			arr[i + 1],
			i < classes - 1 ? arr[i + 2] : 2 * arr[i + 1] - arr[i],
			(t - i / classes) * classes
		);
	};
}

function interpolatorSplineBasisClosed(arr: number[]): SimpleInterpolator {
	let classes = arr.length - 1;
	return (t: number) => {
		let i = t === 1 ? classes - 1 : Math.floor(t * classes);
		return bspline(
			arr[(i - 1 + arr.length) % arr.length],
			arr[i],
			arr[(i + 1) % arr.length],
			arr[(i + 2) % arr.length],
			(t - i / classes) * classes
		);
	};
}

function interpolateSplineBasis(fixup, type = 'default', γ = 1) {
	fixup = fixup || identity;
	const ease = gamma(γ);
	return arr => {
		switch (type) {
			case 'default':
				return t => interpolatorSplineBasis(fixup(arr))(ease(t));
			case 'closed':
				return t => interpolatorSplineBasisClosed(fixup(arr))(ease(t));
			default:
				throw new Error(`invalid type ${type}`);
		}
	};
}

export {
	interpolateSplineBasis,
	interpolatorSplineBasis,
	interpolatorSplineBasisClosed
};