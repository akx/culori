export type HueValue = { h: number | undefined };
type AlphaValue = { alpha?: number };
export type CubehelixValues = {
	h: number | undefined;
	s: number | undefined;
	l: number;
};
export type HSIValues = { h: number | undefined; s: number; i: number };
export type HSLValues = { h: number | undefined; s: number; l: number };
export type HSVValues = { h: number | undefined; s: number; v: number };
export type HWBValues = { h: number | undefined; w: number; b: number };
export type JABValues = { j: number; a: number; b: number };
export type JCHValues = { j: number; c: number; h: number | undefined };
export type LABValues = { l: number; a: number; b: number };
export type LCHValues = { l: number; c: number; h: number | undefined };
export type LUVValues = { l: number; u: number; v: number };
export type RGBValues = { r: number; g: number; b: number };
export type XYZValues = { x: number; y: number; z: number };
export type YIQValues = { y: number; i: number; q: number };

export type CubehelixAValues = CubehelixValues & AlphaValue;
export type HSValues = Pick<HSLValues, 'h' | 's'>;
export type HCValues = Pick<LCHValues, 'h' | 'c'>;
export type HSIAValues = HSIValues & AlphaValue;
export type HSLAValues = HSLValues & AlphaValue;
export type HSVAValues = HSVValues & AlphaValue;
export type HWBAValues = HWBValues & AlphaValue;
export type JABAValues = JABValues & AlphaValue;
export type LABAValues = LABValues & AlphaValue;
export type LCHAValues = LCHValues & AlphaValue;
export type LUVAValues = LUVValues & AlphaValue;
export type RGBAValues = RGBValues & AlphaValue;
export type XYZAValues = XYZValues & AlphaValue;
export type YIQAValues = YIQValues & AlphaValue;

export interface Color<Mode extends string = string> {
	mode: Mode;
	alpha?: number;
}

export type RGBColor = Color<'rgb'> & RGBValues;
export type Rec2020Color = Color<'rec2020'> & RGBValues;
export type ProphotoColor = Color<'prophoto'> & RGBValues;
export type P3Color = Color<'p3'> & RGBValues;
export type LRGBColor = Color<'lrgb'> & RGBValues;
export type XYZ65Color = Color<'xyz65'> & XYZValues;
export type XYZColor = Color<'xyz'> & XYZValues;
export type YIQColor = Color<'yiq'> & YIQValues;
export type OklabColor = Color<'oklab'> & LABValues;
export type OklchColor = Color<'oklch'> & LCHValues;
export type LUVColor = Color<'luv'> & LUVValues;
export type LCHUVColor = Color<'lchuv'> & LCHValues;
export type LCHColor = Color<'lch'> & LCHValues;
export type LCH65Color = Color<'lch65'> & LCHValues;
export type LAB65Color = Color<'lab65'> & LABValues;
export type LABColor = Color<'lab'> & LABValues;
export type JABColor = Color<'jab'> & JABValues;
export type JCHColor = Color<'jch'> & JCHValues;
export type HWBColor = Color<'hwb'> & HWBValues;
export type HSVColor = Color<'hsv'> & HSVValues;
export type HSLColor = Color<'hsl'> & HSLValues;
export type HSIColor = Color<'hsi'> & HSIValues;
export type A98Color = Color<'a98'> & RGBValues;
export type CubehelixColor = Color<'cubehelix'> & CubehelixValues;
export type DLABColor = Color<'dlab'> & LABValues;
export type DLCHColor = Color<'dlch'> & LCHValues;

export type InterpolatorFunction = (...a: any) => any; // TODO
type Fixup = (a: any) => any; // TODO
export type ColorParser<ColorType extends Color> = (
	s: string
) => ColorType | undefined;
export type ColorConverter<ColorType extends Color> = (
	c: Color | string
) => ColorType | undefined;

// TODO: make generic over destination type
export interface ColorSpaceDefinition {
	mode: string;
	alias?: string[];
	output?: Record<string, (a: any) => any>; // TODO
	input?: Record<string, (a: any) => any>; // TODO
	difference: Record<string, (a: any, b: any) => any>; // TODO
	average?: Record<string, (a: any, b: any) => any>; // TODO
	channels: string[];
	parsers?: ColorParser<Color>[];
	ranges: Record<string, [number, number]>;
	interpolate: Record<string, { use: InterpolatorFunction; fixup?: Fixup }>;
}
