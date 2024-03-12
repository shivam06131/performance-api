import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
const bodyParser = require('body-parser')
const cors = require('cors')
require('./config/config')
import routes from './routes'
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//adding routes
routes(app)

const PORT = process.env.PORT || 3456
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV || 'dev'} Server is running on http://localhost:${PORT}`)
})
export default app
