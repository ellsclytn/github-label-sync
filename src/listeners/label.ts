import { EventPayloads } from '@octokit/webhooks'
import { WebhookListener } from '.'
import { getRepositories } from '../github/get-repositories'

type LabelWebhookListener = WebhookListener<EventPayloads.WebhookPayloadLabel>;

export const createLabelListener: LabelWebhookListener = (
  webhooks,
  respond
) => {
  webhooks.on('label', async (webhook) => {
    // TODO: Write the webhook handler
    console.log(webhook.payload.action)

    const stuff = await getRepositories()

    console.log(stuff)

    return respond({ status: 'OK' })
  })
}
