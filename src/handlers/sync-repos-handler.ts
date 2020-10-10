import { Handler } from 'aws-lambda'
import { LabelChangeset, updateLabels } from '../github/update-labels'
import { WebhookPayloadLabel } from '../webhook-listeners/label'
import { createLabels } from '../github/create-labels'
import { deleteLabels } from '../github/delete-labels'
import { getLabelsMatching } from '../github/get-labels-matching'
import { getRepositories } from '../github/get-repositories'
import { lockLabel, unlockLabel } from '../state/lock'

type SyncReposHandler = Handler<WebhookPayloadLabel>;

export const syncReposHandler: SyncReposHandler = async ({
  action,
  changes,
  label,
  repository
}) => {
  if (typeof changes !== 'undefined') {
    const name: string = changes.name?.from ?? label.name
    /* Editing a label name is special, because we need to lock both the
     * original, and the new name. The new name gets locked when the
     * webhook is received, while we do the old label name locking here.
     *
     * Additionally, we still await this lock just so we can bail out in the
     * unlikely event that another transaction involving the old label name is
     * already underway.
     */
    if (typeof changes.name?.from === 'string') {
      await lockLabel(changes.name.from)
    }

    const labels = await getLabelsMatching(name)

    const labelChanges: LabelChangeset = {
      name: label.name,
      color: label.color,
      description: label.description
    }

    await updateLabels(labels, labelChanges)
    const newLabelUnlock = unlockLabel(label.name)

    if (typeof changes.name?.from === 'string') {
      await Promise.all([newLabelUnlock, unlockLabel(changes.name.from)])
    } else {
      await newLabelUnlock
    }
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
    await unlockLabel(name)
  }

  if (action === 'deleted') {
    const labelsToDelete = await getLabelsMatching(label.name).then((labels) =>
      labels.filter((l) => label.node_id !== l)
    )

    await deleteLabels(labelsToDelete)
    await unlockLabel(label.name)
  }
}
