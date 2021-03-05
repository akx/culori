const normalizeHue = (hue: number | undefined): number => {
	if (hue === undefined) return 0; // TODO: is this the intent here?
	return (hue = hue % 360) < 0 ? hue + 360 : hue;
};

export default normalizeHue;
