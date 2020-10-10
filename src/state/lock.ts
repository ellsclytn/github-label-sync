import { LockError } from './errors'
import { docClient } from './client'
import { labelsTable } from '../environment'

/** Lock period (seconds) before an entry is considered unlocked again */
const LOCK_TIMEOUT = 60

export const lockLabel = async (label: string): Promise<void> => {
  const isLockInPlace = await docClient
    .get({
      TableName: labelsTable,
      Key: {
        name: label
      }
    })
    .promise()

  if (
    typeof isLockInPlace.Item?.lockedAt === 'number' &&
    new Date().getTime() - isLockInPlace.Item.lockedAt < LOCK_TIMEOUT * 1000
  ) {
    throw new LockError(label)
  }

  await docClient
    .put({
      TableName: labelsTable,
      Item: {
        name: label,
        lockedAt: new Date().getTime()
      }
    })
    .promise()
}

export const unlockLabel = async (label: string): Promise<void> => {
  await docClient
    .put({
      TableName: labelsTable,
      Item: {
        name: label,
        lockedAt: null
      }
    })
    .promise()
}
