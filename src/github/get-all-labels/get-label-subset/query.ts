import { gql } from 'graphql-request'
import { labelFields, paginationFields } from '../../fragments'

export const query = gql`
  ${labelFields}
  ${paginationFields}

  query getLabelSubset {
    labelConnection1: node(id: "sample") {
      __typename

      ... on Repository {
        id
        labels(first: 100, after: "sample") {
          ...labelFields
        }
      }
    }
  }
`
