import { DynamoDB } from 'aws-sdk'
import { isOffline } from '../environment'

export const docClient = new DynamoDB.DocumentClient({
  ...(isOffline ? { endpoint: 'http://localhost:8000' } : {})
})
