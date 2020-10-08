import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import { Webhooks } from '@octokit/webhooks'
import { respond, respondWithError } from './responders'
import { validateRequest } from './validation'
import { createWebhookListeners } from './listeners'

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

  /** The event listeners for various webhook types, wrapped as a Promise.
   *  Resolves whenever the first event listener finishes executing its logic.
   *
   *  Also it's a slightly annoying trick to deal with the fact that
   *  webhooks.js is a bit more tailored toward a callback world vs. Promises
   */
  const webhookListener = new Promise<APIGatewayProxyResult>(
    createWebhookListeners(webhooks)
  )

  await webhooks.receive({
    id: event.headers['x-github-delivery'],
    name: event.headers['x-github-event'],
    payload: body
  })

  return await webhookListener
}

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    return await parseRequest(event)
  } catch (e) {
    console.dir(e)

    return respondWithError(e)
  }
}
