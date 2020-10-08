import { query } from './query'
import { requestClient } from '../request-client'
import {
  GetLabelsMatchingQuery,
  GetLabelsMatchingQueryVariables
} from '../../generated/graphql'

const { GITHUB_ORGANIZATION: org } = process.env

/** Returns label IDs throughout the Org matching a string */
export const getLabelsMatching = async (
  label: string,
  accumulation: string[] = [],
  after: string | null = null
): Promise<string[]> => {
  const variables: GetLabelsMatchingQueryVariables = {
    // Request client triggers an error if the org isn't defined
    org: org as string,
    after,
    label
  }

  const { organization } = await requestClient.request<GetLabelsMatchingQuery>(
    query,
    variables
  )

  if (
    typeof organization?.repositories.nodes?.length === 'undefined' ||
    organization.repositories.nodes.length === 0
  ) {
    return []
  }

  const newAccumulation = [
    ...accumulation,
    ...(organization.repositories.nodes
      .map((repo) => repo?.label?.id)
      .filter((id) => typeof id !== 'undefined') as string[])
  ]

  if (organization.repositories.pageInfo.hasNextPage) {
    return await getLabelsMatching(
      label,
      newAccumulation,
      organization.repositories.pageInfo.endCursor ?? null
    )
  }

  /* TODO: Handle repos missing a label rather than just ignore them. Should
   * probably fire a label creation in that situation.
   */
  return newAccumulation
}
