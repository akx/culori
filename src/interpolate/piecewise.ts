type ClassesAtom<T> = [T, T] | undefined;

function get_classes<T>(arr: readonly T[]): ClassesAtom<T>[] {
	let classes: ClassesAtom<T>[] = [];
	for (let i = 0; i < arr.length - 1; i++) {
		let a = arr[i];
		let b = arr[i + 1];
		if (a === undefined && b === undefined) {
			classes.push(undefined);
		} else if (a !== undefined && b !== undefined) {
			classes.push([a, b]);
		} else {
			classes.push(a !== undefined ? [a, a] : [b, b]);
		}
	}
	return classes;
}

export function interpolatorPiecewise<T>(
	interpolator: (a: T, b: T, i: number) => T
) {
	return (arr: readonly T[]) => {
		const classes = get_classes(arr);
		return (t: number) => {
			let cls = t * classes.length;
			let idx = t === 1 ? classes.length - 1 : Math.floor(cls);
			let pair = classes[idx];
			// This segment contained one or more undefineds,
			// so all of it is undefined...
			if (pair === undefined) return undefined;
			return interpolator(pair[0], pair[1], cls - idx);
		};
	};
}
