
import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import url from 'url';

global.APP_NAME = app.getName();
global.APP_VERSION = app.getVersion();
global.DESCRIPTION = 'bilibi small video is a player for bilibili desktop';
global.ROOT = __dirname;
global.USER_ROOT = join(app.getPath('appData'), global.APP_NAME);
global.MODULE_PATH = join(global.ROOT, 'node_modules');
global.useCustomTitleBar = process.platform === 'win32' || process.platform === 'linux';

const args = require('./services/cli')(global.APP_NAME, global.APP_VERSION, global.DESCRIPTION);
global.DEBUG = /(^d$)||(^debug$)/i.test(args.environment);


global.logger = require('./services/logger');
const { logger, useCustomTitleBar } = global;

require('./services/trustModulePath').setAllowedPath([global.ROOT, global.USER_ROOT]); // only load the modules in trust path
const config = require('./services/config').default; // load config
const shortcut = require('./services/shortcuts'); // load shortcut

let mainWindow;

function createWindow() {
    shortcut.register('');
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: config.get('window.width', 800),
        height: config.get('window.height', 600),
        title: config.get('window.title', '哔哩哔哩小电视'),
        titleBarStyle: process.platform === 'darwin' && Number(require('os').release().split('.')[0]) >= 17 ? null : 'hidden',
        frame: !useCustomTitleBar,
    });
    global.mainWindow = mainWindow;
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));
    logger.info('page loaded');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        logger.info('window cloesed');
        mainWindow = null;
        global.mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    shortcut.unregisterAll();
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        logger.info('quited');
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        logger.info('re-opened');
        createWindow();
    }
});

ipcMain.on('refresh-shortcut', () => {
    shortcut.unregister();    
    shortcut.register();    
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
process.on('uncaughtException', (e) => {
    logger.fatal(e);
});