import { GetAllLabelsQuery } from '../../../generated/graphql'
import { GetLabelSubsetsQuery } from './graphql-types'
import { LabelRepoSet } from '../'
import { gql } from 'graphql-request'
import { labelFields } from '../../fragments'
import { requestClient } from '../../request-client'

export type RepoNodes = NonNullable<
GetAllLabelsQuery['organization']
>['repositories']['nodes'];

/** Reduce a set of RepositoryConnections into a single-dimension LabelRepoSet
 *  array */
export const repoNodesToLabelRepoSets = (repos: RepoNodes): LabelRepoSet[] => {
  if (typeof repos?.length !== 'number' || repos?.length === 0) return []

  return repos.reduce((acc, repo) => {
    if (
      typeof repo?.id !== 'string' ||
      typeof repo.labels?.nodes?.length !== 'number'
    ) {
      return acc
    }

    const labelRepoSets = repo.labels.nodes.reduce((acc, label) => {
      if (label === null) return acc

      const { __typename, ...usefulLabelData } = label

      return [
        ...acc,
        {
          repoId: repo.id,
          ...usefulLabelData
        }
      ]
    }, []) as LabelRepoSet[]

    return [...acc, ...labelRepoSets]
  }, [])
}

export const getLabelSubsets = async (
  repos: RepoNodes,
  accumulation: LabelRepoSet[] = []
): Promise<LabelRepoSet[]> => {
  if (repos === null || repos.length === 0) return accumulation

  if (accumulation.length > 0) {
    console.log(`Accumulating RepoLabelSets. ${accumulation.length} so far.`)
  }

  /** TODO: If there's nothing left to query, we shouldn't build out a query at
   *  all. */
  const repoQueries: string = repos
    .map((repo, i) => {
      if (
        typeof repo?.id !== 'string' ||
        typeof repo.labels?.pageInfo.endCursor !== 'string'
      ) {
        return ''
      }

      return gql`
        labelConnection${i + 1}: node(id: "${repo.id}") {
          __typename

          ...on Repository {
            id
            labels(first: 100, after: "${repo.labels.pageInfo.endCursor}") {
              ...labelFields
            }
          }
        }
      `
    })
    .join('')

  const query = gql`
    ${labelFields}

    query getLabelConnections {
      ${repoQueries}
    }
  `

  const { __typename, ...result } = await requestClient.request<
  GetLabelSubsetsQuery
  >(query)

  const newRepoNodes = Object.values(result) as NonNullable<RepoNodes>
  const newLabelRepoSets = repoNodesToLabelRepoSets(newRepoNodes)

  const reposNeedingMoreLabelQueries = newRepoNodes.filter(
    (repo) =>
      /* It's a boolean or it's undefined. Go away, eslint */
      /* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */
      repo?.__typename === 'Repository' && repo.labels?.pageInfo.hasNextPage
  ) as RepoNodes

  const newAccumulation = [...accumulation, ...newLabelRepoSets]

  if (
    reposNeedingMoreLabelQueries === null ||
    reposNeedingMoreLabelQueries.length === 0
  ) {
    return newAccumulation
  }

  return await getLabelSubsets(reposNeedingMoreLabelQueries, newAccumulation)
}
