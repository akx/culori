// D65 -> D50

export default ({ x, y, z }) => ({
	x: x * 1.0478112 + y * 0.0228866 - z * 0.0501270,
	y: x * 0.0295424 + y * 0.9904844 - z * 0.0170491,
	z: x * -0.0092345 + y * 0.0150436 + z * 0.7521316
});