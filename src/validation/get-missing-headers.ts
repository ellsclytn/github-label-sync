const WEBHOOK_HEADERS = [
  'x-github-event',
  'x-hub-signature',
  'x-github-delivery'
]

/** Returns names of headers which are required to be considered a GitHub
 *  webhook, but are missing in the request.
 *
 *  https://developer.github.com/webhooks/#delivery-headers
 */
export function getMissingHeaders (requestHeaders: {
  [name: string]: string
}): string[] {
  return WEBHOOK_HEADERS.filter((header) => !(header in requestHeaders))
}
