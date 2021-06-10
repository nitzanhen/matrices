export const crossProduct = (u: [number, number, number], v: [number, number, number]) => {
  const [u1, u2, u3] = u;
  const [v1, v2, v3] = v;

  return [u2 * v3 - u3 * v2, u3 * v1 - u1 * v3, u1 * v2 - u2 * v1];
}