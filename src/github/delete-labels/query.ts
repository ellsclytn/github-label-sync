import { gql } from 'graphql-request'

/** A sample Label deletion mutation, kept so it can be used with the
 *  graphql-codegen script (because the real mutation is too dynamic)
 */
export const query = gql`
  mutation deleteLabels {
    labelDelete1: deleteLabel(
      input: { clientMutationId: "sample", id: "sample" }
    ) {
      clientMutationId
    }
  }
`
