import {
  GetAllLabelsQuery,
  GetAllLabelsQueryVariables
} from '../../generated/graphql'
import { query } from './query'
import { requestClient } from '../request-client'
import { githubOrg } from '../../environment'
import {
  getLabelSubsets,
  repoNodesToLabelRepoSets,
  RepoNodes
} from './get-label-subset'

export interface LabelRepoSet {
  repoId: string
  id: string
  name: string
  color: string
  description?: string | null
}

/** Returns Labels and Repo IDs throughout the Org */
export const getAllLabels = async (
  accumulation: LabelRepoSet[] = [],
  after: string | null = null
): Promise<LabelRepoSet[]> => {
  const variables: GetAllLabelsQueryVariables = {
    org: githubOrg,
    reposAfter: after
  }

  const { organization } = await requestClient.request<GetAllLabelsQuery>(
    query,
    variables
  )

  if (
    typeof organization?.repositories.nodes?.length === 'undefined' ||
    organization.repositories.nodes.length === 0
  ) {
    return accumulation
  }

  const newAccumulation = repoNodesToLabelRepoSets(
    organization.repositories.nodes
  )
  const reposNeedingMoreLabelQueries = organization.repositories.nodes.filter(
    (repo) =>
      /* It's a boolean or it's undefined. Go away, eslint */
      /* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */
      repo?.__typename === 'Repository' && repo.labels?.pageInfo.hasNextPage
  ) as NonNullable<RepoNodes>

  if (reposNeedingMoreLabelQueries.length === 0) {
    return [...accumulation, ...newAccumulation]
  }

  const nextPageLabels = await getLabelSubsets(organization.repositories.nodes)

  return [...newAccumulation, ...nextPageLabels]
}
