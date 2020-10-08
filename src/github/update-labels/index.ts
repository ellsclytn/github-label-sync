import { UpdateLabelsMutation } from './graphql-types'
import { gql } from 'graphql-request'
import { randomString } from '../random-string'
import { requestClient } from '../request-client'

export interface LabelChangeset {
  name?: string
  color?: string
  description?: string
}

/** Creates a mutation for each label, for use under a parent mutation */
const generateLabelMutations = (
  labels: string[],
  { name, color, description }: LabelChangeset
): string =>
  labels
    .map(
      (label, i) => gql`
        labelUpdate${i + 1}: updateLabel(input: {
          clientMutationId: "${randomString()}",
          id: "${label}",
          name: "${name}",
          color: "${color}",
          description: "${description}"
        }) {
          label {
            __typename
            repository {
              __typename
              name
            }
          }
        }
      `
    )
    .join('')

/** Updates labels according to a label changeset. Resolves with the names of
 *  respositories which received the updates.
 */
export const updateLabels = async (
  labels: string[],
  newLabel: LabelChangeset
): Promise<string[]> => {
  if (labels.length === 0) return []

  const query = gql`
    mutation updateLabels {
      ${generateLabelMutations(labels, newLabel)}
    }
  `

  const result = await requestClient.request<UpdateLabelsMutation>(query)

  return Object.values(result)
    .map((value) => value?.label?.repository.name)
    .filter((repo) => typeof repo === 'string') as string[]
}
