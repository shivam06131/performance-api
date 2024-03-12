import { Message, ResponseMessage } from '../types/genericTypes'
import { Response } from 'express'

const serverResponse = {
  sendSuccess: (res: Response, message: Message, data = null) => {
    const responseMessage: ResponseMessage = {
      code: message.code ? message.code : 500,
      success: message.success,
      message: message.message,
    }
    if (data) {
      responseMessage.data = data
    }
    return res.status(message.code).json(responseMessage)
  },
  sendError: (res: Response, error) => {
    const responseMessage: ResponseMessage = {
      code: error.code ? error.code : 500,
      success: false,
      message: error.message,
    }
    return res.status(error.code ? error.code : 500).json(responseMessage)
  },
}

export default serverResponse
