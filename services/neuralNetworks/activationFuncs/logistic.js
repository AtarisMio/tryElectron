export const activationFunc = (x) => 1 / (1 + Math.exp(-x));
export const activationFuncPrime = (x) => activationFunc(x)(1 - activationFunc(x))