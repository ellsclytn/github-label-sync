import { gql } from 'graphql-request'

export const query = gql`
  query getLabelsMatching($after: String, $org: String!, $label: String!) {
    organization(login: $org) {
      repositories(privacy: PRIVATE, first: 100, after: $after) {
        nodes {
          label(name: $label) {
            id
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`
