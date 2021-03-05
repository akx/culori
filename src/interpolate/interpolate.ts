import converter from '../converter';
import { getModeDefinition } from '../modes';
import normalizePositions from '../util/normalizePositions';
import easingMidpoint from '../easing/midpoint';
import { mapAlphaDivide, mapAlphaMultiply, mapper } from '../map';
import { isfn, isnum } from '../utils';
import { Color } from '../types';

type InterpolateColorEntry = Color | number | Function;

function prepareInterpolation(
	mode: string,
	colors: readonly InterpolateColorEntry[]
) {
	let conv = converter(mode);

	let conv_colors: Color[] = [];
	let positions: (number | undefined)[] = [];
	let fns: Record<string, number | Function> = {};

	colors.forEach(val => {
		if (Array.isArray(val)) {
			const [color, pos] = val;
			const convColor = conv(color);
			if (convColor === undefined)
				throw new Error(`Could not convert color ${val[0]} to ${mode}`);
			conv_colors.push(convColor);
			positions.push(+pos);
		} else if (isnum(val) || isfn(val)) {
			// Color interpolation hint or easing function
			fns[positions.length] = val;
		} else {
			const convColor = conv(val);
			if (convColor === undefined)
				throw new Error(`Could not convert color ${val[0]} to ${mode}`);
			conv_colors.push(convColor);
			positions.push(undefined);
		}
	});

	const normalizedPositions = normalizePositions(positions);
	return { conv_colors, positions: normalizedPositions, fns };
}

const interpolate_fn = (
	colors: readonly InterpolateColorEntry[],
	mode = 'rgb',
	overrides = {},
	premap?
) => {
	let def = getModeDefinition(mode);
	let { conv_colors, positions, fns } = prepareInterpolation(mode, colors);

	// override the default interpolators
	// from the color space definition with any custom ones
	let fixed = def.channels.reduce((res, ch) => {
		let ffn;
		if (overrides[ch]?.fixup) {
			ffn = overrides[ch].fixup;
		} else if (def.interpolate[ch]?.fixup) {
			ffn = def.interpolate[ch].fixup;
		} else {
			ffn = v => v;
		}
		res[ch] = ffn(conv_colors.map(color => color[ch]));
		return res;
	}, {});

	if (premap) {
		let ccolors = conv_colors.map((_color, idx) => {
			return def.channels.reduce(
				(c, ch) => {
					c[ch] = fixed[ch][idx];
					return c;
				},
				{ mode }
			);
		});
		fixed = def.channels.reduce((res, ch) => {
			res[ch] = ccolors.map(c => {
				let v = premap(c[ch], ch, c, mode);
				return isNaN(v) ? undefined : v;
			});
			return res;
		}, {});
	}

	let interpolators = def.channels.reduce((res, ch) => {
		let ifn;
		if (isfn(overrides)) {
			ifn = overrides;
		} else if (isfn(overrides?.[ch])) {
			ifn = overrides[ch];
		} else if (overrides[ch]?.use) {
			ifn = overrides[ch].use;
		} else if (isfn(def.interpolate[ch])) {
			ifn = def.interpolate[ch];
		} else if (isfn(def.interpolate[ch]?.use)) {
			ifn = def.interpolate[ch].use;
		}

		res[ch] = ifn(fixed[ch]);
		return res;
	}, {});

	let n = conv_colors.length - 1;

	return t => {
		// clamp t to the [0, 1] interval
		t = Math.min(Math.max(0, t), 1);

		if (t <= positions[0]) {
			return conv_colors[0];
		}

		if (t > positions[n]) {
			return conv_colors[n];
		}

		// Convert `t` from [0, 1] to `t0` between the appropriate two colors.
		// First, look for the two colors between which `t` is located.
		// Note: this can be optimized by searching for the index
		// through bisection instead of start-to-end.
		let idx = 0;
		while (positions[idx] < t) idx++;
		let start = positions[idx - 1];
		let delta = positions[idx] - start;

		let P = (t - start) / delta;

		// use either the local easing, or the global easing, if any
		let fn = fns[idx] || fns[0];
		if (fn !== undefined) {
			if (isnum(fn)) {
				fn = easingMidpoint((fn - start) / delta);
			}
			P = fn(P);
		}

		let t0 = (idx - 1 + P) / n;

		return def.channels.reduce(
			(res, channel) => {
				let val = interpolators[channel](t0);
				if (val !== undefined) {
					res[channel] = val;
				}
				return res;
			},
			{ mode }
		);
	};
};

const interpolate = (colors, mode = 'rgb', overrides) =>
	interpolate_fn(colors, mode, overrides);

const interpolateWith = (premap, postmap) => (
	colors,
	mode = 'rgb',
	overrides
) => {
	const post = postmap ? mapper(postmap, mode) : undefined;
	let it = interpolate_fn(colors, mode, overrides, premap);
	return post ? t => post(it(t)) : it;
};

const interpolateWithPremultipliedAlpha = interpolateWith(
	mapAlphaMultiply,
	mapAlphaDivide
);

export { interpolate, interpolateWith, interpolateWithPremultipliedAlpha };
