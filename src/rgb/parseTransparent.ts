import parseNumber from './parseNumber';
import { RGBColor } from '../types';

const parseTransparent = (c: string): RGBColor | undefined =>
	c === 'transparent' ? parseNumber(0x00000000, 8) : undefined;

export default parseTransparent;
