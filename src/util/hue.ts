export const hue = (val: number, unit: string): number => {
	switch (unit) {
		case 'deg':
			return +val;
		case 'rad':
			return (val / Math.PI) * 180;
		case 'grad':
			return (val / 10) * 9;
		case 'turn':
			return val * 360;
	}
	throw new Error(`Invalid unit: ${unit}`);
};
