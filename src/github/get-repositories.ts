import { gql } from 'graphql-request'
import { requestClient } from './request-client'

const { GITHUB_ORGANIZATION: org } = process.env

const query = gql`
  query getRepositories($after: String, $org: String!) {
    organization(login: $org) {
      repositories(privacy: PRIVATE, first: 100, after: $after) {
        nodes {
          name
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

// TODO: Add GQL types generation
/** Returns GitHub repository names belonging to the Organization */
export const getRepositories = async (
  repositories: string[] = [],
  after?: string
): Promise<any> => {
  const variables = {
    org,
    after
  }

  const data = await requestClient.request(query, variables)

  const newRepositories = [
    ...repositories,
    ...data.organization.repositories.nodes.map(({ name }) => name)
  ]

  if (data.organization.repositories.pageInfo.hasNextPage) {
    return await getRepositories(
      newRepositories,
      data.organization.repositories.pageInfo.endCursor
    )
  }

  return newRepositories
}
