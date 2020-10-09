import { Lambda } from 'aws-sdk'
import { isOffline } from '../environment'

const params: Lambda.ClientConfiguration = {
  apiVersion: '2031',
  ...(isOffline ? { endpoint: 'http://localhost:3002' } : {})
}

export const lambda = new Lambda(params)
