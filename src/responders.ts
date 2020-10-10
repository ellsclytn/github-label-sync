import { APIGatewayProxyResult } from 'aws-lambda'
import { RequestError } from './errors'
import { LockError } from './state/errors'

export type AsyncResponder = (payload: any, statusCode?: number) => void;

export function respond (payload: any, statusCode = 200): APIGatewayProxyResult {
  return {
    statusCode,
    body: JSON.stringify(payload)
  }
}

/** Format an error as an APIGatewayProxyResult. Handles known error types, and
 *  obfuscates to a generic response in all other cases.
 */
export function respondWithError (error: Error): APIGatewayProxyResult {
  if (error instanceof RequestError) {
    return respond(
      {
        status: 'error',
        message: error.message,
        ...(error.messages != null ? { messages: error.messages } : {})
      },
      error.code
    )
  }

  return respond(
    {
      status: 'error',
      message: 'Internal server error'
    },
    500
  )
}
