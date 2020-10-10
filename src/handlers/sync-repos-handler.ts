import { Handler } from 'aws-lambda'
import { LabelChangeset, updateLabels } from '../github/update-labels'
import { WebhookPayloadLabel } from '../webhook-listeners/label'
import { getLabelsMatching } from '../github/get-labels-matching'
import { getRepositories } from '../github/get-repositories'
import { createLabels } from '../github/create-labels'

type SyncReposHandler = Handler<WebhookPayloadLabel>;

export const syncReposHandler: SyncReposHandler = async ({
  action,
  changes,
  label,
  repository
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

  if (action === 'created') {
    const reposNeedingLabel = await getRepositories().then((repos) =>
      repos.filter((repo) => repo !== repository.node_id)
    )

    const { name, color, description } = label

    await createLabels(reposNeedingLabel, {
      name,
      color,
      description
    })
  }
}
