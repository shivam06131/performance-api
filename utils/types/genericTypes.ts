export interface PerformanceData {
  averageTime: number;
  minTime: number;
  maxTime: number;
  requestPerSecond: number;
  totalVirtualUsers: number;
  ninetyPercentile: number;
  ninetyFifthPercentile: number;
  totalTimeTaken: number;
}

export interface Message {
  code: number;
  success: boolean;
  message: string;
}

export interface ResponseMessage extends Message {
  data?: unknown;
}

export interface Error {
  status: number;
  message: string;
}
