import { remote } from 'electron';

window.remote = remote;
window.APP_NAME = remote.getGlobal('APP_NAME');
window.APP_VERSION = remote.getGlobal('APP_VERSION');
window.DESCRIPTION = remote.getGlobal('DESCRIPTION');
window.ROOT = remote.getGlobal('ROOT');
window.USER_ROOT = remote.getGlobal('USER_ROOT');
window.MODULE_PATH = remote.getGlobal('MODULE_PATH');
window.DEBUG = remote.getGlobal('DEBUG');
window.logger = remote.getGlobal('logger');
window.mainWindow = remote.getGlobal('mainWindow');
window.useCustomTitleBar = remote.getGlobal('useCustomTitleBar');

Object.clone = obj => JSON.parse(JSON.stringify(obj));

window.$ = param => document.querySelector(param);