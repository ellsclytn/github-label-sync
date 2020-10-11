import { EventPayloads } from '@octokit/webhooks'
import { WebhookListener } from '.'
import { getAllLabels } from '../github/get-all-labels'

type PingWebhookListener = WebhookListener<EventPayloads.WebhookPayloadPing>;

export const createPingListener: PingWebhookListener = (
  webhooks,
  respond
): void => {
  webhooks.on('ping', async () => {
    const result = await getAllLabels()
    console.log(result)
    return respond({ status: 'OK' })
  })
}
