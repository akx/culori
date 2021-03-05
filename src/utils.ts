// eslint-disable-next-line @typescript-eslint/ban-types
import { Color } from './types';

export function isfn(o): o is Function {
	return typeof o === 'function';
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isobj(o): o is object {
	return o && typeof o === 'object';
}

export function isnum(o): o is number {
	return typeof o === 'number';
}

export const identity = v => v;

export function isColorlike(o: Record<string, any>): o is Color {
	return typeof o === 'object' && o['mode'] !== undefined;
}
