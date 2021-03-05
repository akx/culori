import converter from './converter';
import { getModeDefinition } from './modes';
import { isfn } from './utils';

const averageAngle = (val: readonly number[]): number => {
	// See: https://en.wikipedia.org/wiki/Mean_of_circular_quantities
	let sum = val.reduce(
		(sum, val) => {
			if (val !== undefined) {
				let rad = (val * Math.PI) / 180;
				sum.sin += Math.sin(rad);
				sum.cos += Math.cos(rad);
			}
			return sum;
		},
		{ sin: 0, cos: 0 }
	);
	return (Math.atan2(sum.sin, sum.cos) * 180) / Math.PI;
};

const averageNumber = (val: number[]): number | undefined => {
	let a = val.filter(v => v !== undefined);
	return a.length ? a.reduce((sum, v) => sum + v, 0) / a.length : undefined;
};

function average(colors, mode = 'rgb', overrides) {
	let def = getModeDefinition(mode);
	let cc = colors.map(converter(mode));
	return def.channels.reduce(
		(res, ch) => {
			let arr = cc.map(c => c[ch]).filter(val => val !== undefined);
			if (arr.length) {
				let fn;
				if (isfn(overrides)) {
					fn = overrides;
				} else if (overrides && isfn(overrides[ch])) {
					fn = overrides[ch];
				} else if (def.average && isfn(def.average[ch])) {
					fn = def.average[ch];
				} else {
					fn = averageNumber;
				}
				res[ch] = fn(arr, ch);
			}
			return res;
		},
		{ mode }
	);
}

export { average, averageAngle, averageNumber };