import { Color, ColorParser, ColorSpaceDefinition } from './types';
import { identity } from './utils';

const converters: Record<string, Record<string, any>> = {};
const modes: Record<string, ColorSpaceDefinition> = {};
const parsers: ColorParser<Color>[] = [];

function assignConverter(
	sourceMode: string,
	targetMode: string,
	converter: any
) {
	if (!converters[sourceMode]) converters[sourceMode] = {};
	converters[sourceMode][targetMode] = converter;
}

function defineMode(definition: ColorSpaceDefinition) {
	let mode = definition.mode;
	for (let targetMode in definition.output) {
		assignConverter(mode, targetMode, definition.output[targetMode]);
	}
	for (let sourceMode in definition.input) {
		assignConverter(sourceMode, mode, definition.input[sourceMode]);
	}

	definition.channels.forEach(channel => {
		// undefined channel ranges default to the [0, 1] interval
		if (definition.ranges[channel] === undefined) {
			definition.ranges[channel] = [0, 1];
		}

		if (!definition.interpolate[channel]) {
			throw new Error(`Missing interpolator for: ${channel}`);
		}

		if (!definition.interpolate[channel].fixup) {
			definition.interpolate[channel].fixup = identity;
		}
	});

	modes[mode] = definition;
	(definition.parsers || []).forEach(parser => parsers.push(parser));
}

function getModeDefinition(mode: string): ColorSpaceDefinition {
	const def = modes[mode];
	if (!def) {
		throw new Error(`Color mode ${mode} is unknown`);
	}
	return def;
}

export { defineMode, getModeDefinition, converters, parsers };
