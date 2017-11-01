export const activationFunc = (x) => x / (1 + Math.abs(x));
export const activationFuncPrime = (x) => 1 / ((1 + Math.abs(x)) ** 2);