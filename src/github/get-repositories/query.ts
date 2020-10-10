import { gql } from 'graphql-request'

export const query = gql`
  query getRepositories($after: String, $org: String!) {
    organization(login: $org) {
      repositories(privacy: PRIVATE, first: 100, after: $after) {
        nodes {
          id
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`
