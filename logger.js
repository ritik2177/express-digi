import { createLogger, format, transports } from "winston";
const { combine, timestamp, json } = format;

// custom format for console logging with colors
const consoleFormat = combine(
    format.colorize(),
    format.printf(({ level, message, timestamp }) => {
        return `${level}: ${message}`;
    })
);

// create a Winston logger
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new transports.Console({
            format: consoleFormat
        }),
        new transports.File({ filename: 'app.log' }),
    ],
});

export default logger;