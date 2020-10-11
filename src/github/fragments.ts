import { gql } from 'graphql-request'

export const paginationFields = gql`
  fragment paginationFields on PageInfo {
    __typename
    endCursor
    hasNextPage
  }
`

export const labelFields = gql`
  fragment labelFields on LabelConnection {
    nodes {
      __typename
      id
      color
      name
      description
    }

    pageInfo {
      ...paginationFields
    }
  }
`
