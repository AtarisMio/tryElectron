import React from 'react';
import ReactDOM from 'react-dom';
import { TitleBarWrapper } from './title-bar';
import MNIST from 'mnist';

const { $, useCustomTitleBar } = window;
// const { TitleBarWrapper } = require('./components/etc/menu');

// const { useCustomTitleBar } = global;

window.MNIST = MNIST;

ReactDOM.render(
    <TitleBarWrapper />,
    $('title-bar')
);

ReactDOM.render(
    <div>neural network, { String(useCustomTitleBar) }</div>,
    $('main-view')
);

