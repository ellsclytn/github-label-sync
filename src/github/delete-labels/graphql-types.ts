import { Maybe, DeleteLabelPayload } from '../../generated/graphql'

type DeleteLabelsMutationSingle = {
  readonly __typename?: 'DeleteLabelPayload'
} & Pick<DeleteLabelPayload, 'clientMutationId'>;

/** Return type of createLabels mutation. Manually created as a dynamic set
 *  of mutations is a little bit too much for the GraphQL Code generator to
 *  handle on its own.
 */
export type DeleteLabelsMutation = { readonly __typename?: 'Mutation' } & {
  readonly [mutationName: string]: Maybe<DeleteLabelsMutationSingle>
};
