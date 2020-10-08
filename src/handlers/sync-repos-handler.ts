import { Handler } from 'aws-lambda'
import { LabelChangeset, updateLabels } from '../github/update-labels'
import { WebhookPayloadLabel } from '../listeners/label'
import { getLabelsMatching } from '../github/get-labels-matching'

type SyncReposHandler = Handler<WebhookPayloadLabel>;

export const syncReposHandler: SyncReposHandler = async ({
  changes,
  label
}) => {
  if (typeof changes !== 'undefined') {
    const name: string = changes.name?.from ?? label.name
    const labels = await getLabelsMatching(name)

    const labelChanges: LabelChangeset = {
      name: label.name,
      color: label.color,
      description: label.description
    }

    await updateLabels(labels, labelChanges)
  }
}
