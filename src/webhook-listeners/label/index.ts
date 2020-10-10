import { LabelWebhookListener } from './types'
import { lambda } from '../../handlers/lambda'
import { repoSyncFunctionName } from '../../environment'
import { lockLabel } from '../../state/lock'
import { LockError } from '../../state/errors'

export const createLabelListener: LabelWebhookListener = (
  webhooks,
  respond
) => {
  webhooks.on('label', async (webhook) => {
    try {
      await lockLabel(webhook.payload.label.name)
    } catch (e) {
      if (e instanceof LockError) {
        return respond({ status: 'ACCEPTED', message: e.message }, e.code)
      } else {
        throw e
      }
    }

    /* Mutations are slow, and GitHub only gives
     * us 10 seconds before a webhook is considered to have timed out. So we
     * just do the real work in a separate lambda and return HTTP 204.
     */
    await lambda
      .invoke({
        FunctionName: repoSyncFunctionName,
        InvocationType: 'Event',
        Payload: JSON.stringify(webhook.payload)
      })
      .promise()

    respond({ status: 'ACCEPTED' }, 204)
  })
}

export { WebhookPayloadLabel } from './types'
