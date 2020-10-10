import {
  GetRepositoriesQuery,
  GetRepositoriesQueryVariables
} from '../../generated/graphql'
import { githubOrg } from '../../environment'
import { query } from './query'
import { requestClient } from '../request-client'

/** Returns repository IDs throughout the Org */
export const getRepositories = async (
  accumulation: string[] = [],
  after: string | null = null
): Promise<string[]> => {
  const variables: GetRepositoriesQueryVariables = {
    org: githubOrg,
    after
  }

  const { organization } = await requestClient.request<GetRepositoriesQuery>(
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
      .map((repo) => repo?.id)
      .filter((id) => typeof id !== 'undefined') as string[])
  ]

  if (organization.repositories.pageInfo.hasNextPage) {
    return await getRepositories(
      newAccumulation,
      organization.repositories.pageInfo.endCursor ?? null
    )
  }

  return newAccumulation
}
