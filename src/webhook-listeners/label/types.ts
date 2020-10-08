import { EventPayloads } from '@octokit/webhooks'
import { WebhookListener } from '..'

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

export type LabelWebhookListener = WebhookListener<WebhookPayloadLabel>;
