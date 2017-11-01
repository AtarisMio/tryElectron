import { Layer } from './layer';
const gaussRandom = () => Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
const randomArray = (n) => Array.from({ length: n }).map(() => gaussRandom());

const sum = (a, b) => a + b;

export class Neural {
    __value = 0;
    __weights = [];
    __bias = null;

    constructor(preLayer = null) {
        if (!(preLayer instanceof Layer) && preLayer !== null) {
            throw new TypeError(`preLayer isnot a instance of Layer: ${preLayer}`);
        }
        this.preLayer = preLayer;
        this.__weights = randomArray(preLayer.length);
        this.__bias = preLayer && gaussRandom();
    }

    get weights() {
        return this.__weights;
    }

    set weights(weights) {
        const { length } = this.preLayer;
        this.__weights = Array.prototype.slice.call(weights, 0, length).map(Number); // ensure weights length equal preLayer's neurals length
    }

    get bias() {
        return this.__bias;
    }

    set bias(value) {
        this.__bias = value;
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