import { get, set } from 'lodash';
import CSON from 'cson';
import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

const { ROOT, USER_ROOT, logger } = global;
const defaultConfigPath = path.join(ROOT, 'config.cson');
const configPath = path.join(USER_ROOT, 'config.cson');
export const SetEvent = Symbol('config.set');

class Config extends EventEmitter {
    config = {};
    constructor() {
        super();
        let defaultConfig = {};
        let userConfig = {};
        try {
            fs.accessSync(defaultConfigPath, fs.R_OK);
            defaultConfig = CSON.parseCSONFile(defaultConfigPath) || {};
            logger.info(`defaultConfig loaded from ${defaultConfigPath}`);
        } catch (e) {
            logger.error(`load defaultConfig failed from ${defaultConfigPath}`);
            logger.warn(e);
        }
        try {
            fs.accessSync(configPath, fs.R_OK);
            userConfig = CSON.parseCSONFile(configPath) || {};
            logger.info(`userConfig loaded from ${configPath}`);
        } catch (e) {
            logger.warn(`load userConfig failed from ${configPath}`);
            logger.warn(e);
        }
        this.config = Object.assign({}, defaultConfig, userConfig);
    }

    get(path = '', fallbackValue = undefined) {
        if (path === '') {
            return Object.create(this.config);
        }
        const value = get(this.config, path, fallbackValue);
        logger.info(`get config ${path}: ${value}`);
        return value;
    }
    set(path, value) {
        if (get(this.config, path) === value) {
            return;
        }
        logger.info(`set config ${path}: ${value}`);
        set(this.config, path, value);
        this.emit(SetEvent, path, value);
        try {
            fs.writeFileSync(configPath, CSON.stringify(this.config, null, 4));
        }
        catch (e) {
            logger.error(`write config fail`);
            logger.warn(e);
        }
    }
}

const config = new Config();
config.setMaxListeners(100);

export default config;