class ApiResponse {
  constructor(
    public statusCode: number,
    public data: object,
    public message: string,
    public success: boolean
  ) {}
}

export default ApiResponse;
