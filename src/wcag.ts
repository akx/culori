import converter from './converter';
import { Color, LRGBColor } from './types';

/*
	WCAG luminance
	References: 

	https://en.wikipedia.org/wiki/Relative_luminance
	https://github.com/w3c/wcag/issues/236#issuecomment-379526596
 */
export function luminance(color: Color): number {
	let c = converter<LRGBColor>('lrgb')(color);
	if (!c) return NaN;
	return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
}

/*
	WCAG contrast
 */
export function contrast(a: Color, b: Color): number {
	let L1 = luminance(a);
	let L2 = luminance(b);
	return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}
