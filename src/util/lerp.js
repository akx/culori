export default (a, b, t) =>
	a === undefined || b === undefined ? undefined : a + t * (b - a);
