import { Maybe, Repository } from '../../generated/graphql'

type CreateLabelsMutationSingle = {
  readonly __typename?: 'CreateLabelPayload'
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

/** Return type of createLabels mutation. Manually created as a dynamic set
 *  of mutations is a little bit too much for the GraphQL Code generator to
 *  handle on its own.
 */
export type CreateLabelsMutation = { readonly __typename?: 'Mutation' } & {
  readonly [mutationName: string]: Maybe<CreateLabelsMutationSingle>
};
