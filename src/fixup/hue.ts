import normalizeHue from '../util/normalizeHue';

type HueArray = readonly (number | undefined)[];

const hue = (hues: HueArray, fn: (n: number) => number) => {
	return hues
		.map((hue, idx, arr) => {
			if (hue === undefined) {
				return hue;
			}
			let normalized = normalizeHue(hue);
			if (idx === 0 || hues[idx - 1] === undefined) {
				return normalized;
			}
			return fn(normalized - normalizeHue(arr[idx - 1]));
		})
		.reduce<(number | undefined)[]>((acc, curr) => {
			const last = acc[acc.length - 1];
			if (!acc.length || curr === undefined || last === undefined) {
				acc.push(curr);
				return acc;
			}
			acc.push(curr + last);
			return acc;
		}, []);
};

let hueShorter = d => (Math.abs(d) <= 180 ? d : d - 360 * Math.sign(d));
let hueLonger = d =>
	Math.abs(d) >= 180 || d === 0 ? d : d - 360 * Math.sign(d);
export const fixupHueShorter = (arr: HueArray) => hue(arr, hueShorter);
export const fixupHueLonger = (arr: HueArray) => hue(arr, hueLonger);
export const fixupHueIncreasing = (arr: HueArray) =>
	hue(arr, d => (d >= 0 ? d : d + 360));
export const fixupHueDecreasing = (arr: HueArray) =>
	hue(arr, d => (d <= 0 ? d : d - 360));
