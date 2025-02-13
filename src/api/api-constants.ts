export const API_HEADER = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
}

export const HTTP_CODES = {
  OK: 200,

  BAD_REQUEST: 400,
  NOT_ALLOWED: 405,
};

export const HTTP_ERRORS = {
  [HTTP_CODES.OK]: 'Success',
  [HTTP_CODES.NOT_ALLOWED]: 'Method Not Allowed',
  [HTTP_CODES.BAD_REQUEST]: 'Bad request',
};
