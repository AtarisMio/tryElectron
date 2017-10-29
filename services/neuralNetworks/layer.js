import Neural from './neural';

export class Layer extends Array{
    preLayer = null;
    postLayer = null;

    constructor(layersize, preLayer = null) {
        if (!(preLayer instanceof Layer) && preLayer !== null) {
            throw new TypeError(`preLayer isnot a instance of Layer: ${preLayer}`);
        }
        super();
        this.preLayer = preLayer;
        for(let i = 0;i < layersize; i++) {
            this.push(new Neural(preLayer));
        }
    }

    cloneNeurals() {
        return [...this];
    }

    setNextLayer(postLayer) {
        if (!(postLayer instanceof Layer) && postLayer !== null) {
            throw new TypeError(`preLayer isnot a instance of Layer: ${postLayer}`);
        }
        this.postLayer = postLayer;
    }
}