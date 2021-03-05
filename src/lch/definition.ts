import convertLabToLch from './convertLabToLch';
import convertLchToLab from './convertLchToLab';
import convertLabToRgb from '../lab/convertLabToRgb';
import convertRgbToLab from '../lab/convertRgbToLab';
import parseLch from './parseLch';
import { fixupHueShorter } from '../fixup/hue';
import { fixupAlpha } from '../fixup/alpha';
import { interpolatorLinear } from '../interpolate/linear';
import { differenceHueChroma } from '../difference';
import { averageAngle } from '../average';
import { ColorSpaceDefinition } from '../types';

const definition: ColorSpaceDefinition = {
	mode: 'lch',
	alias: ['lch-d50'],

	output: {
		lab: c => convertLchToLab(c, 'lab'),
		rgb: c => convertLabToRgb(convertLchToLab(c))
	},

	input: {
		rgb: c => convertLabToLch(convertRgbToLab(c)),
		lab: convertLabToLch
	},

	channels: ['l', 'c', 'h', 'alpha'],

	ranges: {
		l: [0, 100],
		c: [0, 131.008],
		h: [0, 360]
	},

	parsers: [parseLch],

	interpolate: {
		h: { use: interpolatorLinear, fixup: fixupHueShorter },
		c: { use: interpolatorLinear },
		l: { use: interpolatorLinear },
		alpha: { use: interpolatorLinear, fixup: fixupAlpha }
	},

	difference: {
		h: differenceHueChroma
	},

	average: {
		h: averageAngle
	}
};

export default definition;