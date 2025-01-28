export class BlogError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'BlogError'
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof BlogError) {
    return {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode
    }
  }

  console.error('Unhandled error:', error)
  return {
    error: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    statusCode: 500
  }
}
