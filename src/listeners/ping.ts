import { EventPayloads } from '@octokit/webhooks'
import { WebhookListener } from '.'

type PingWebhookListener = WebhookListener<EventPayloads.WebhookPayloadPing>;

export const createPingListener: PingWebhookListener = (
  webhooks,
  respond
): void => {
  webhooks.on('ping', () => {
    /* There's not much to do here but say "message received" */
    return respond({ status: 'OK' })
  })
}
