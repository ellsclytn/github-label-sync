import { APIGatewayProxyEvent } from 'aws-lambda'
import { RequestError } from '../errors'
import { WebhookEvent, Webhooks } from '@octokit/webhooks'
import { getMissingHeaders } from './get-missing-headers'

export function validateRequest (
  event: APIGatewayProxyEvent,
  body: any,
  webhooks: Webhooks<WebhookEvent<any>>
): void {
  const missingHeaders = getMissingHeaders(event.headers)

  if (missingHeaders.length > 0) {
    throw new RequestError('Missing GitHub request headers', {
      code: 400,
      messages: missingHeaders.map((header) => `Missing header: ${header}`)
    })
  }

  const isVerified = webhooks.verify(body, event.headers['x-hub-signature'])
  if (!isVerified) {
    throw new RequestError('Signature invalid', { code: 400 })
  }
}
