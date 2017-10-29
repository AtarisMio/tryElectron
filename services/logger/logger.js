import { getLogger, configure, levels } from 'log4js';
import path from 'path';

const { USER_ROOT, DEBUG } = global;

configure({
    appenders: {
        console: { type: 'console' },
        file: {
            type: 'file',
            filename: path.join(USER_ROOT, 'log', 'runtimeLog.log'),
            maxLogSize: 1024000,
            backups: 3,
            compress: true,
        },
    },
    categories: {
        default: { appenders: ['console', 'file'], level: DEBUG ? levels.ALL : levels.ERROR },
    },
});

const logger = getLogger('default');

export default logger;