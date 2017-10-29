import { Module } from 'module';
import path from 'path';

const { _nodeModulePaths } = Module;

export const setAllowedPath = (allowedPath) => {
    Module._nodeModulePaths = function (from) {
        return _nodeModulePaths.call(this, from).filter(dir => allowedPath.map(rule => !path.relative(rule, dir).includes('..')).reduce((a, b) => a || b, true));
    };
};