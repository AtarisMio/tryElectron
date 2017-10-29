import Layer from './layer';

export class NeuralNetwork {
    constructor(size_array) {
        this.length = size_array.length;
        let pre_layer = null;
        this.layers = size_array.map(size => {
            const current = new Layer(size, pre_layer);
            pre_layer && pre_layer.setNextLayer(current);
            pre_layer = current;
            return current;
        });
        this.inputLayer = this.layers[0];
        this.outputLayer = this.layers[this.length - 1];
    }

    updateSensor () {

    }
}