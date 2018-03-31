export default ({ x, y, z }) => {
  let f0 = x > 0.008539390708926 ? Math.cbrt(x / 0.9642) : (936.834988898876059 * x + 16) / 116;
  let f1 = y > 0.088564516790360 ? Math.cbrt(y / 1.0000) : (903.296296296296296 * y + 16) / 116;
  let f2 = z > 0.007465103120259 ? Math.cbrt(z / 0.8249) : (1095.03733336925239 * z + 16) / 116;
  return {
    l: 116 * f1 - 16,
    a: 500 * (f0 - f1),
    b: 200 * (f1 - f2)
  };
};