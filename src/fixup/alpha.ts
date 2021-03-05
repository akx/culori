const fixupAlpha = (arr: readonly (number | undefined)[]): number[] => {
	let some_defined = false;
	let res: number[] = arr.map(v => {
		if (v !== undefined) {
			some_defined = true;
			return v;
		}
		return 1;
	});
	return some_defined ? res : (arr as number[]); // TODO: remove cast, make sound
};

export { fixupAlpha };
