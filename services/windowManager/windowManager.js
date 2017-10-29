import { BrowserWindow, screen } from 'electron';

const windows = global.windows = [];
const windowIndex = global.windowIndex = {};

const state = [];
let hidden = false;
const { ICON, logger } = global;

const inRange = (n, min, range) => (n != null && n >= min && n < min + range);

const withinDisplay = (display, x, y) => {
    const wa = display.workArea;
    return inRange(x, wa.x, wa.width) && inRange(y, wa.y, wa.height);
}

const normalizePosition = (options) => {
    const { workArea } = screen.getPrimaryDisplay();
    let { x, y } = options;
    if (!screen.getAllDisplays().some(display => withinDisplay(display, x, y))) {
        x = workArea.x
        y = workArea.y
    };

    return Object.assign(options, {
        x,
        y,
    });
};


export const createWindow = (options) => {
    logger.info(`Creating window ${options.indexName || ''}`.trim());
    const current = new BrowserWindow({
        show: false,
        icon: ICON,
        ...normalizePosition(options)
    });
    if (options.indexName) {
        windowIndex[options.indexName] = current;
    }
    current.setMenu(options.menu || null);
    const show = current.show;
    current.show = () => {
        if (current.isMinimized()) {
            current.restore();
        } else {
            show.call(current);
        }
    }

    current.on('closed', e => {
        if (options.indexName) {
            delete windowIndex[options.indexName];
        }
        const index = windows.indexOf(current);
        windows.splice(index, 1);
    });
    if (!options.navigatable) {
        current.webContents.on('will-navigate', e => {
            e.preventDefault();
        });
    }
    windows.push(current);
    return current;
};

export const closeWindow = (win) => {
    win.close();
    return true;
};

export const closeAllWindow = () => {
    windows.map(win => win && win.close() && null);
}

export const toggleAllWindowsVisbility = () => {
    BrowserWindow.getAllWindows().forEach(win => {
        if (!hidden) {
            state[win.id] = win.isVisible();
            win.hide();
        } else {
            if (state[win.id]) {
                win.show();
            }
        }
        hidden = !hidden;
    });
};

export const getWindowsIndex = () => {
    const { windowIndex } = global;
    return windowIndex;
};

export const getWindow = (name) => {
    return global.windowsIndex[name];
};

export const getMainWindow = () => {
    return global.mainWindow;
};

export const getAllWindows = () => BrowserWindow.getAllWindows();