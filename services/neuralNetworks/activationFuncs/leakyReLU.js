export const activationFunc = (x) => x < 0 ? 0.01 * x : x;
export const activationFuncPrime = (x) => x < 0 ? 0.01 : 1;