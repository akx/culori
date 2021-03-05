import convertHsiToRgb from './convertHsiToRgb';
import convertRgbToHsi from './convertRgbToHsi';
import { fixupHueShorter } from '../fixup/hue';
import { fixupAlpha } from '../fixup/alpha';
import { interpolatorLinear } from '../interpolate/linear';
import { differenceHueSaturation } from '../difference';
import { averageAngle } from '../average';
import { ColorSpaceDefinition } from '../types';

const definition: ColorSpaceDefinition = {
	mode: 'hsi',

	output: {
		rgb: convertHsiToRgb
	},

	input: {
		rgb: convertRgbToHsi
	},

	channels: ['h', 's', 'i', 'alpha'],

	ranges: {
		h: [0, 360]
	},

	interpolate: {
		h: { use: interpolatorLinear, fixup: fixupHueShorter },
		s: { use: interpolatorLinear },
		i: { use: interpolatorLinear },
		alpha: { use: interpolatorLinear, fixup: fixupAlpha }
	},

	difference: {
		h: differenceHueSaturation
	},

	average: {
		h: averageAngle
	}
};

export default definition;
