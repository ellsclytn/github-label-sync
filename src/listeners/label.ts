import { EventPayloads } from '@octokit/webhooks'
import { LabelChangeset, updateLabels } from '../github/update-labels'
import { WebhookListener } from '.'
import { getLabelsMatching } from '../github/get-labels-matching'

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
interface WebhookPayloadLabel
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
    const { changes, label } = webhook.payload

    if (typeof changes !== 'undefined') {
      const name: string = changes.name?.from ?? label.name
      const labels = await getLabelsMatching(name)

      const labelChanges: LabelChangeset = {
        name: label.name,
        color: label.color,
        description: label.description
      }

      /* TODO: Defer this to an async lambda function, and give HTTP 202 in the
       * original response. Because mutations are slow, and GitHub only gives
       * us 10 seconds before a webhook is considered to have timed out.
       */
      await updateLabels(labels, labelChanges)
    }

    respond({ status: 'OK' })
  })
}
