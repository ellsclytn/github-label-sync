import { EventPayloads } from '@octokit/webhooks'
import { WebhookListener } from '.'

type LabelWebhookListener = WebhookListener<EventPayloads.WebhookPayloadLabel>;

export const createLabelListener: LabelWebhookListener = (
  webhooks,
  respond
): void => {
  webhooks.on('label', (webhook) => {
    // TODO: Write the webhook handler
    console.log(webhook.payload.action)

    return respond({ status: 'OK' })
  })
}
