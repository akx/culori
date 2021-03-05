import convertLabToRgb from './convertLabToRgb';
import convertLabToXyz from './convertLabToXyz';
import convertRgbToLab from './convertRgbToLab';
import convertXyzToLab from './convertXyzToLab';
import parseLab from './parseLab';
import { interpolatorLinear } from '../interpolate/linear';
import { fixupAlpha } from '../fixup/alpha';
import { ColorSpaceDefinition } from '../types';

const definition: ColorSpaceDefinition = {
	mode: 'lab',
	alias: ['lab-d50'],

	output: {
		xyz: convertLabToXyz,
		rgb: convertLabToRgb
	},

	input: {
		xyz: convertXyzToLab,
		rgb: convertRgbToLab
	},

	channels: ['l', 'a', 'b', 'alpha'],

	difference: {},

	ranges: {
		l: [0, 100],
		a: [-79.167, 93.408],
		b: [-111.859, 93.246]
	},

	parsers: [parseLab],

	interpolate: {
		l: { use: interpolatorLinear },
		a: { use: interpolatorLinear },
		b: { use: interpolatorLinear },
		alpha: { use: interpolatorLinear, fixup: fixupAlpha }
	}
};

export default definition;