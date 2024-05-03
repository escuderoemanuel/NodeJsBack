const winston = require('winston');

//error 0
//warn 1 
//info 2 <---- 
//http 3
//verbose 4 
//debug 5
//silly 6  

const logger = winston.createLogger({
    transports: [
        // new winston.transports.Console({ 
        //     level: 'http', 
        //     format: winston.format.printf(info => `custom - ${info.message} - LEVEL: ${info.level}`) }), <---con diseño custom
        new winston.transports.Console({
            level: 'http',
            format: winston.format.cli()
        }),
        new winston.transports.File({
            level: 'warn',
            filename: './errors.log',
            format: winston.format.combine(
                winston.format.timestamp(), //<----optional
                winston.format.errors({ stack: true }),  //<----optional
                winston.format.json())
        })
    ]
})

const devLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'verbose', format: winston.format.combine(winston.format.timestamp(), winston.format.cli()) })
    ]
})

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'http', format: winston.format.cli() }),
        new winston.transports.File({ level: 'warn', filename: './prodError.log' })
    ]
})


//** TEST */
// logger.error('this is an unhandled error', new Error('This is an error'));
// logger.warn('this is a warning');
// logger.http('this is a http log');
// logger.debug('this is a debug log');
// logger.info('this is a info log');


module.exports = {
    logger,
    devLogger,
    prodLogger
}; 