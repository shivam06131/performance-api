export interface PerformaceData {
  averageTime: number
  minTime: number
  maxTime: number
  requestPerSecond: number
  totoalVirtualUsers: number
  ninetyPercentile: number
  ninetyFifthPercentile: number
  totalTimeTaken: number
}

export interface Message {
  code: number
  success: boolean
  message: string
}

export interface ResponseMessage extends Message {
  data?: any
}

export interface Error {
  status: number
  message: string
}
