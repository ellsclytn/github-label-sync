import { GraphQLClient } from 'graphql-request'
import { Headers } from 'cross-fetch'

const { GITHUB_ORGANIZATION: org, GITHUB_API_TOKEN: token } = process.env
if (typeof org !== 'string' || typeof token !== 'string') {
  throw new Error('Environment variables missing')
}

const GRAPHQL_URL = 'https://api.github.com/graphql'

/* A hopefully temporary workaround while the issue is open
 * https://github.com/prisma-labs/graphql-request/issues/206
 */
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
global.Headers = global.Headers || Headers

export const requestClient = new GraphQLClient(GRAPHQL_URL, {
  headers: {
    authorization: `Bearer ${token}`,
    /** Required for Labels API in GraphQL
     *  https://docs.github.com/en/free-pro-team@latest/graphql/overview/schema-previews#labels-preview
     */
    accept: 'application/vnd.github.bane-preview+json'
  }
})
