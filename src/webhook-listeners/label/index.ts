import { LabelWebhookListener } from './types'
import { lambda } from '../../handlers/lambda'

export const createLabelListener: LabelWebhookListener = (
  webhooks,
  respond
) => {
  webhooks.on('label', async (webhook) => {
    /* Mutations are slow, and GitHub only gives
     * us 10 seconds before a webhook is considered to have timed out. So we
     * just do the real work in a separate lambda and return HTTP 204.
     */
    await lambda
      .invoke({
        FunctionName: 'github-label-sync-dev-syncRepos',
        InvocationType: 'Event',
        Payload: JSON.stringify(webhook.payload)
      })
      .promise()

    respond({ status: 'ACCEPTED' }, 204)
  })
}

export { WebhookPayloadLabel } from './types'
