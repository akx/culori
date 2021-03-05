import { converters } from './modes';
import prepare from './_prepare';
import { Color, ColorConverter } from './types';

function converter<ColorType extends Color = Color>(
	target_mode = 'rgb'
): ColorConverter<ColorType> {
	return function (color: Color | string): ColorType | undefined {
		const preparedColor = prepare(color, target_mode);
		if (preparedColor === undefined) {
			return undefined;
		}
		let { mode: source_mode } = preparedColor;
		if (source_mode === target_mode) {
			return preparedColor as ColorType;
		}
		if (converters[source_mode][target_mode]) {
			return converters[source_mode][target_mode](preparedColor);
		}
		if (target_mode === 'rgb') {
			return converters[source_mode].rgb(preparedColor);
		}
		return converters['rgb'][target_mode](
			converters[source_mode].rgb(preparedColor)
		);
	};
}

export default converter;
