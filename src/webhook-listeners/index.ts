import { APIGatewayProxyResult } from 'aws-lambda'
import { AsyncResponder, respond } from '../responders'
import { WebhookEvent, Webhooks } from '@octokit/webhooks'
import { createLabelListener } from './label'
import { createPingListener } from './ping'

type Resolver = (response: APIGatewayProxyResult) => void;

export type WebhookListener<T> = (
  webhooks: Webhooks<WebhookEvent<T>>,
  respond: AsyncResponder
) => void;

const listeners = [createPingListener, createLabelListener]

export const createWebhookListeners = (
  webhooks: Webhooks<WebhookEvent<any>>
) => (resolve: Resolver) => {
  /** Delivers HTTP response */
  const responder: AsyncResponder = (...args) => resolve(respond(...args))

  listeners.forEach((listener) => listener(webhooks, responder))
}
