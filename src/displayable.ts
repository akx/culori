import converter from './converter';
import { Color, RGBColor } from './types';

let rgb = converter<RGBColor>('rgb');

const displayable = (color: Color): boolean => {
	let c = rgb(color);
	return (
		c !== undefined &&
		c.r >= 0 &&
		c.r <= 1 &&
		c.g >= 0 &&
		c.g <= 1 &&
		c.b >= 0 &&
		c.b <= 1
	);
};

export default displayable;
