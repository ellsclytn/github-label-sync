import { Maybe, Repository } from '../../generated/graphql'

type UpdateLabelsMutationSingle = {
  readonly __typename?: 'UpdateLabelPayload'
} & {
  readonly label: Maybe<
  { readonly __typename: 'Label' } & {
    readonly repository: { readonly __typename: 'Repository' } & Pick<
    Repository,
    'name'
    >
  }
  >
};

/** Return type of updateLabels mutation. Manually created as a dynamic set
 *  of mutations is a little bit too much for the GraphQL Code generator to
 *  handle on its own.
 */
export type UpdateLabelsMutation = { readonly __typename?: 'Mutation' } & {
  readonly [mutationName: string]: Maybe<UpdateLabelsMutationSingle>
};
