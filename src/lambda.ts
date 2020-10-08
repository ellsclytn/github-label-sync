import { Lambda } from 'aws-sdk'

const isOffline = process.env.IS_OFFLINE === 'true'

const params: Lambda.ClientConfiguration = {
  apiVersion: '2031',
  ...(isOffline ? { endpoint: 'http://localhost:3002' } : {})
}

export const lambda = new Lambda(params)
