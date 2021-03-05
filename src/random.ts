import { getModeDefinition } from './modes';

/*
	Generate a random number between `min` and `max`
 */
const rand = (min, max) => min + Math.random() * (max - min);

type Constraints<T> = Record<string, T | T[]>;

/*
	Convert a constraints object to intervals.
 */
function to_intervals<T>(constraints: Constraints<T>): Record<string, T[]> {
	return Object.keys(constraints).reduce((o, k) => {
		const v = constraints[k];
		o[k] = Array.isArray(v) ? v : [v, v];
		return o;
	}, {});
}

/*
	Generate a random color.
 */
const random = (mode = 'rgb', constraints: Constraints<number> = {}) => {
	let def = getModeDefinition(mode);
	let limits = to_intervals(constraints);
	return def.channels.reduce(
		(res, ch) => {
			// ignore alpha if not present in constraints
			if (limits.alpha || ch !== 'alpha') {
				const [min, max] = limits[ch] || def.ranges[ch];
				res[ch] = rand(min, max);
			}
			return res;
		},
		{ mode }
	);
};

export default random;
