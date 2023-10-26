class ApiError {
  constructor(
    public statusCode: number,
    public error: Error,
    public success: boolean,
    public message?: string
  ) {}
}

export default ApiError;
