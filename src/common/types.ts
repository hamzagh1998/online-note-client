export type Response = {
  data: { error: boolean; detail: object | null };
};

export type MiddlewareErrorResponse = {
  error: Response;
};
