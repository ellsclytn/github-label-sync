export interface RequestErrorOptions {
  code: number
  messages?: string[]
}

export class RequestError extends Error {
  /** HTTP Error code to respond with */
  code: number;
  /** Breakdown of error messages (when multiple error messages are applicable) */
  messages?: string[];

  constructor (message: string, { code, messages }: RequestErrorOptions) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = RequestError.name
    this.code = code
    this.messages = messages
  }
}
