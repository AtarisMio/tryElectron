import { globalShortcut } from 'electron';

const { logger } = global;

const registerShortcut = (acc, desc, func) => {
    logger.info(`Registering shortcut ${acc} => ${desc}`);
    try {
        const result = globalShortcut.register(acc, func);
        if (!result) {
            throw new Error('Unknown Error');
        }
        return true;
    } catch (e) {
        logger.error(`Failed to register shortcut ${acc}: ${e}`);
        return false;
    }
};

const unregisterShortcut = (acc) => {
    logger.info(`Unregister shortcut [${acc}]`);
    globalShortcut.unregister(acc);
};

const unregisterAll = () => {
    logger.info(`Unregister all shortcuts`);
    globalShortcut.unregisterAll();
};

export default registerShortcut;
export const register = registerShortcut;
export {
    unregisterShortcut,
    unregisterAll,
};