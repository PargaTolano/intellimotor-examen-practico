const { 
    createLogger, 
    format, 
    transports,
} = require('winston');

const { 
    combine, 
    timestamp, 
    label, 
    colorize, 
    printf
} = format;

const packageJson = require('./package.json');

// formato personalizado para logging
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const consoleLogger = new transports.Console({
    colorize: true,
    level: 'debug'
});

const logger = createLogger({
    transports: [
        consoleLogger
    ],
    format: combine(
        label({ label: packageJson.name }),
        timestamp(),
        colorize(),
        myFormat
      ),
});

logger.exitOnError = false;
module.exports.log = logger;
