import { EventPayloads } from '@octokit/webhooks'
import { WebhookListener } from '.'
import { lambda } from '../handlers/lambda'

interface LabelPropertyChange {
  /** The property value prior to the change being applied */
  from: string
}

interface LabelChanges {
  name?: LabelPropertyChange
  color?: LabelPropertyChange
  description?: LabelPropertyChange
}

/** octokit/webhooks definition of a WebhookPayloadLabel is incomplete, with
 *  the "name" and "description" being completely unknown to it, even though
 *  they are quite present in the real Webhook payload. So this is an override
 *  to better match reality.
 */
export interface WebhookPayloadLabel
  extends Omit<EventPayloads.WebhookPayloadLabel, 'changes'> {
  changes?: LabelChanges
  label: EventPayloads.WebhookPayloadLabelLabel & {
    description?: string
  }
}

type LabelWebhookListener = WebhookListener<WebhookPayloadLabel>;

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
