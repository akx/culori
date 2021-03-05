const lerp = (
	a: number | undefined,
	b: number | undefined,
	t: number
): number | undefined =>
	a === undefined || b === undefined ? undefined : a + t * (b - a);

export default lerp;
