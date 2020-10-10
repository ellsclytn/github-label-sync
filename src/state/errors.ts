import { RequestError } from '../errors'

export class LockError extends RequestError {
  constructor (label: string) {
    super(`Transaction already in place for "${label}"`, { code: 202 })
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = LockError.name
  }
}
