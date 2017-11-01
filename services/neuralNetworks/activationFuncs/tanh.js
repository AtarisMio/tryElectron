export const activationFunc = (x) => Math.tanh(x);
export const activationFuncPrime = (x) => 1 - activationFunc(x) ** 2;