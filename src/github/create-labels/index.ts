import { gql } from 'graphql-request'
import { randomString } from '../random-string'
import { requestClient } from '../request-client'
import { CreateLabelsMutation } from './graphql-types'

export interface LabelCreationInput {
  name: string
  color: string
  description?: string
}

/** Creates a mutation for each label, for use under a parent mutation */
const generateLabelMutations = (
  repos: string[],
  { name, color, description }: LabelCreationInput
): string =>
  repos
    .map((repo, i) => {
      const optionalDescription =
        typeof description === 'string' ? `description: "${description}"` : ''

      return gql`
        labelCreate${i + 1}: createLabel(input: {
          clientMutationId: "${randomString()}",
          repositoryId: "${repo}",
          name: "${name}",
          color: "${color}",
          ${optionalDescription}
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
    })
    .join('')

/** Creates labels according to a label changeset and repository list. Resolves
 *  with the names of respositories which had labels created.
 */
export const createLabels = async (
  repos: string[],
  label: LabelCreationInput
): Promise<string[]> => {
  if (repos.length === 0) return []

  const query = gql`
    mutation createLabels {
      ${generateLabelMutations(repos, label)}
    }
  `

  const result = await requestClient.request<CreateLabelsMutation>(query)

  return Object.values(result)
    .map((value) => value?.label?.repository.name)
    .filter((repo) => typeof repo === 'string') as string[]
}
