import { ERROR_MESSAGES } from './constants';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleAPIError = (error: any): string => {
  if (error.response) {
    const status = error.response.status;
    
    switch (status) {
      case 400:
        return ERROR_MESSAGES.VALIDATION_ERROR;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return error.response.data?.message || ERROR_MESSAGES.SERVER_ERROR;
    }
  }
  
  if (error.request) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  return error.message || 'An unexpected error occurred';
};

export const logError = (error: Error, context?: string) => {
  console.error(`[${context || 'APP'}] Error:`, {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
};