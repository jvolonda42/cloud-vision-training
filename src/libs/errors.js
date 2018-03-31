import logger from '../libs/logger';

export class NotFoundError {
  constructor (target) {
    this.target = target
  }
}

export class ValidationError {
  constructor (target, action) {
    this.target = target
    this.action = action
  }
}

export class MissingParamsError {
  constructor (target) {
    this.target = target
  }
}

export const handleError = (err, res, message) => {
  logger.error('In error handler', err)
  if (err instanceof NotFoundError) {
    return res.status(404).json({ results: null, message: `${err.target} not found` })
  } else if (err instanceof ValidationError) {
    return res.status(400).json({ results: null, message: ` ${err.target} ${err.action}` })
  } else if (err instanceof MissingParamsError) {
    return res.status(400).json({ results: null, message: `missing params`, err: err.target })
  }
  res.status(500).json({ results: null, message })
}
