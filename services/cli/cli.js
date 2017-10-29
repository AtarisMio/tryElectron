import { ArgumentParser } from 'argparse';

export default (appName, version = 'v0.0.1 alpha', info = '') => {

    const options = [
        {
            name: ['--environment', '-env'],
            config: {
                type: 'string',
                help: `'${appName} --environment debug' or '${appName} -env debug'`,
                choices: ['d', 'p', 't', 'debug', 'production', 'test'],
                action: 'store',
            },
        },
    ];

    const parser = new ArgumentParser({
        version,
        addHelp:true,
        description: info,
    });

    options.map(function(option) {
        parser.addArgument(option.name, option.config);
    });

    return parser.parseArgs();
};