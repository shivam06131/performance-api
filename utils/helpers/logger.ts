const fs = require('fs')
const name = process.env.npm_package_name
const rfs = require('rotating-file-stream')
const pino = require('pino')

const logFileName = `./log/${name}.log`
const logDirectory = './log'
const level = process.env.LOG_LEVEL || 'info'

const consoleStream =
  process.env.ENVIRONMENT === 'development'
    ? require('pino-pretty')({
        translateTime: 'yyyy-mm-dd HH:MM:ss.1',
        sync: false,
      })
    : process.stdout
const destination = pino.destination({ dest: logFileName, sync: false })
const streams = [{ stream: destination }, { stream: consoleStream }]
const logger = pino({ name, level }, pino.multistream(streams))

try {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory)
  }

  if (!fs.existsSync(logFileName)) {
    fs.closeSync(fs.openSync(logFileName, 'w'))
  }

  const logStream = rfs.createStream(logFileName, {
    size: process.env.LOG_SIZE || '10M',
    interval: process.env.LOG_INTERVAL || '1h',
    rotate: process.env.LOG_ROTATION || 3,
    initialRotation: true,
    compress: 'gzip',
  })

  logStream.on('rotated', (_filename: any) => {
    destination.reopen()
  })
} catch (error: any) {
  console.log(`There was an error in logger: ${error?.message ?? ''}`)
}

export default logger
