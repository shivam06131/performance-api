import config from './envData'
import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV || 'development'

if (env === 'development' || env === 'test') {
  const envConfig = config[env]
  // console.log(envConfig);

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  })
}
