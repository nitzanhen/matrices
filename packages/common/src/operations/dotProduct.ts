export const dotProduct = (u: [...number[]], v: [...number[]]) => {
  if (u.length !== v.length) {
    return null;
  }
  const n = u.length;

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += u[i] * v[i];
  }

  return sum;
};
