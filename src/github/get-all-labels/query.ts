import { gql } from 'graphql-request'
import { labelFields, paginationFields } from '../fragments'

export const query = gql`
  ${labelFields}
  ${paginationFields}

  query getAllLabels($reposAfter: String, $org: String!) {
    organization(login: $org) {
      repositories(privacy: PRIVATE, first: 100, after: $reposAfter) {
        nodes {
          __typename
          id
          labels(first: 100) {
            ...labelFields
          }
        }
        pageInfo {
          ...paginationFields
        }
      }
    }
  }
`
