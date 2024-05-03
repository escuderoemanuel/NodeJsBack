const winston = require('winston')

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'red',
    error: 'orange',
    warn: 'yellow',
    info: 'blue',
    http: 'cyan',
    debug: 'white'
  }
}

const prodLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.cli()
    }),
    new winston.transports.File({
      level: 'info', filename: './src/logs/errors.log',
      format: winston.format.simple()
    })
  ]
})

const devLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.cli()
    }),
  ]
})

module.exports = {
  prodLogger,
  devLogger
}
