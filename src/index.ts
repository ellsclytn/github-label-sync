import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import { Webhooks } from '@octokit/webhooks'
import { respond, respondWithError } from './respond'
import { validateRequest } from './validation'

const { WEBHOOK_SECRET: secret } = process.env

if (typeof secret !== 'string') {
  throw new Error('Environment variables missing')
}

const webhooks = new Webhooks({ secret })

const parseRequest = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.body === null) {
    return respond({ status: 'OK' }, 204)
  }
  const body = JSON.parse(event.body)
  validateRequest(event, body, webhooks)

  webhooks.on('label', (webhook) => {
    // TODO: Write the webhook handler
    console.log(webhook?.payload?.action)
  })

  /* Our app has a parent error handler that we want all errors to go to */
  /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
  await webhooks.receive({
    id: event.headers['x-github-delivery'],
    name: event.headers['x-github-event'],
    payload: body
  })

  return respond({ status: 'OK' })
}

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    return await parseRequest(event)
  } catch (e) {
    return respondWithError(e)
  }
}
