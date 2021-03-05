export function getH(r: number, g: number, b: number, m: number, M: number) {
	return (
		(M === r
			? (g - b) / (M - m) + (g < b ? 1 : 0) * 6
			: M === g
			? (b - r) / (M - m) + 2
			: (r - g) / (M - m) + 4) * 60
	);
}
