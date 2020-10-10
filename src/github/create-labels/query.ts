import { gql } from 'graphql-request'

/** A sample Label creation mutation, kept so it can be used with the
 *  graphql-codegen script (because the real mutation is too dynamic)
 */
export const query = gql`
  mutation createLabels {
    labelCreate1: createLabel(
      input: {
        clientMutationId: "sample"
        repositoryId: "sample"
        name: "sample"
        color: "sample"
        description: "sample"
      }
    ) {
      label {
        __typename
        repository {
          __typename
          name
        }
      }
    }
  }
`
