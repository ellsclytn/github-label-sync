import { randomBytes } from 'crypto'

/** TODO: Kill it with fire. This exists so I can supply something as a
 *  clientMutationId. This should be replaced with a structured system
 * for generating IDs for mutations (like a hashIds system)
 */
export const randomString = (): string => randomBytes(20).toString('hex')
