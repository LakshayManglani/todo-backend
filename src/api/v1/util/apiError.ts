class ApiError {
  constructor(
    public statusCode: number,
    public message?: string,
    public error?: object
  ) {}
}

export default ApiError;
