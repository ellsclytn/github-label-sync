import { gql } from 'graphql-request'
import { randomString } from '../random-string'
import { requestClient } from '../request-client'
import { DeleteLabelsMutation } from './graphql-types'

/** Creates a mutation for each label, for use under a parent mutation */
const generateLabelMutations = (labels: string[]): string =>
  labels
    .map(
      (label, i) => gql`
        labelDelete${i + 1}: deleteLabel(
          input: {
            clientMutationId: "${randomString()}",
            id: "${label}"
          }
        ) {
          clientMutationId
        }
    `
    )
    .join('')

/** Deletes labels according to a list of Label IDs. */
export const deleteLabels = async (labels: string[]): Promise<void> => {
  if (labels.length === 0) return

  const query = gql`
    mutation createLabels {
      ${generateLabelMutations(labels)}
    }
  `

  await requestClient.request<DeleteLabelsMutation>(query)
}
