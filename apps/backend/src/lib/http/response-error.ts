import { type HTTPErrorName, type HTTPErrorStatusCode, HTTPStatusCode } from './constants';

interface HTTPErrorResponseOptions<D> extends ErrorOptions {
  data?: D;
}

type MessageType<E extends HTTPErrorName> = E extends 'NotFound' ? NotFoundMessageType : string;
type NotFoundMessageType = { message: string; url: string };

type HTTPErrorResponseData<E extends HTTPErrorName, D> = E extends 'NotFound' ? NotFoundData<D> : D;
type NotFoundData<D> = D & { url: string };

class HTTPErrorResponse<E extends HTTPErrorName, D> extends Error {
  override name: HTTPErrorName = 'InternalServerError';
  status: HTTPErrorStatusCode = 500;
  data: HTTPErrorResponseData<E, D>;

  constructor(error: E, message: MessageType<E>, options?: HTTPErrorResponseOptions<D>);
  constructor(error: E, message: unknown, { data, ...options }: HTTPErrorResponseOptions<D> = {}) {
    const _ = { message: message as string, data: data as HTTPErrorResponseData<E, D> };

    if (error === 'NotFound') {
      _.message = (message as MessageType<'NotFound'>).message;
      _.data = { ..._.data, url: (message as MessageType<'NotFound'>).url };
    }

    super(_.message, options);

    this.name = error;
    this.status = HTTPStatusCode[error];
    this.data = _.data;
  }
}

export default HTTPErrorResponse;
