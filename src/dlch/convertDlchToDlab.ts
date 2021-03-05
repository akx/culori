import { DLABColor, LCHAValues } from '../types';

const convertDlchToDlab = ({ l, c, h, alpha }: LCHAValues): DLABColor => {
	let res: DLABColor = {
		mode: 'dlab',
		l: l,
		a: c === 0 || h === undefined ? 0 : c * Math.cos((h / 180) * Math.PI),
		b: c === 0 || h === undefined ? 0 : c * Math.sin((h / 180) * Math.PI)
	};
	if (alpha !== undefined) res.alpha = alpha;
	return res;
};

export default convertDlchToDlab;
