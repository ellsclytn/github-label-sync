import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Handler
} from 'aws-lambda'
import { LabelChangeset, updateLabels } from './github/update-labels'
import { WebhookPayloadLabel } from './listeners/label'
import { Webhooks } from '@octokit/webhooks'
import { createWebhookListeners } from './listeners'
import { getLabelsMatching } from './github/get-labels-matching'
import { respond, respondWithError } from './responders'
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

type SyncReposHandler = Handler<WebhookPayloadLabel>;

export const syncRepos: SyncReposHandler = async ({ changes, label }) => {
  if (typeof changes !== 'undefined') {
    const name: string = changes.name?.from ?? label.name
    const labels = await getLabelsMatching(name)

    const labelChanges: LabelChangeset = {
      name: label.name,
      color: label.color,
      description: label.description
    }

    await updateLabels(labels, labelChanges)
  }
}
