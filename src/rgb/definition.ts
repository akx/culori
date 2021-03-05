import parseNamed from './parseNamed';
import parseHex from './parseHex';
import parseRgb from './parseRgb';
import parseTransparent from './parseTransparent';
import { interpolatorLinear } from '../interpolate/linear';
import { fixupAlpha } from '../fixup/alpha';
import { ColorSpaceDefinition } from '../types';

/*
	sRGB color space
 */

const definition: ColorSpaceDefinition = {
	mode: 'rgb',
	channels: ['r', 'g', 'b', 'alpha'],
	alias: ['srgb'],
	parsers: [parseHex, parseRgb, parseNamed, parseTransparent],
	ranges: { r: [0, 1], g: [0, 1], b: [0, 1] },
	difference: {},
	interpolate: {
		r: { use: interpolatorLinear },
		g: { use: interpolatorLinear },
		b: { use: interpolatorLinear },
		alpha: { use: interpolatorLinear, fixup: fixupAlpha }
	}
};

export default definition;
