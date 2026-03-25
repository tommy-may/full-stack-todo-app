export type HTTPErrorName = keyof typeof HTTPError;
export type HTTPErrorStatusCode = (typeof HTTPError)[HTTPErrorName];

const HTTPError = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  NotAcceptable: 406,
  InternalServerError: 500,
} as const;

export const HTTPStatusCode = {
  Ok: 200,
  Created: 201,
  ...HTTPError,
} as const;
