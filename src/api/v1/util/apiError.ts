class ApiError {
  constructor(
    public statusCode: number,
    public error: object,
    public success: boolean,
    public message?: string
  ) {}
}

export default ApiError;
