import convertDlabToLab65 from './convertDlabToLab65';
import convertLab65ToDlab from './convertLab65ToDlab';
import convertLab65ToRgb from '../lab65/convertLab65ToRgb';
import convertRgbToLab65 from '../lab65/convertRgbToLab65';
import { interpolatorLinear } from '../interpolate/linear';
import { fixupAlpha } from '../fixup/alpha';
import { ColorSpaceDefinition } from '../types';

const definition: ColorSpaceDefinition = {
	mode: 'dlab',

	output: {
		lab65: convertDlabToLab65,
		rgb: c => convertLab65ToRgb(convertDlabToLab65(c))
	},

	input: {
		lab65: convertLab65ToDlab,
		rgb: c => convertLab65ToDlab(convertRgbToLab65(c))
	},

	channels: ['l', 'a', 'b', 'alpha'],

	ranges: {
		l: [0, 100],
		a: [-40.09, 45.5],
		b: [-40.47, 44.344]
	},

	difference: {},
	interpolate: {
		l: { use: interpolatorLinear },
		a: { use: interpolatorLinear },
		b: { use: interpolatorLinear },
		alpha: {
			use: interpolatorLinear,
			fixup: fixupAlpha
		}
	}
};

export default definition;
