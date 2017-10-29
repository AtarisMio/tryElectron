import Layer from './layer';
const randomArray = (n) => Array.from({ length: n }).map(() => Math.random());

const sum = (a, b) => a + b;

export class Neural {
    __value = 0;
    __weights = [];

    constructor(preLayer = null) {
        if (!(preLayer instanceof Layer) && preLayer !== null) {
            throw new TypeError(`preLayer isnot a instance of Layer: ${preLayer}`);
        }
        this.preLayer = preLayer;
        this.__weights = randomArray(preLayer.length);
    }

    get weights() {
        return this.__weights;
    }

    set weights(weights) {
        const { length } = this.preLayer;
        this.__weights = Array.prototype.slice.call(weights, 0, length).map(Number); // ensure weights length equal preLayer's neurals length
    }

    get value() {
        if (this.preLayer) {
            // sigma(0, m)(xj*wj)
            return this.weights.map((weight, index) => weight * this.preLayer[index]).reduce(sum);

        }
        return this.__value;
    }

    set value(val) {
        this.__value = Number(val);
    }
}