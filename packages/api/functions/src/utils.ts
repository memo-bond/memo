import { Response } from 'express';

export const handleError = (res: any, err: string | any): void => {
  if (typeof err === 'string') {
    res.status(400).send({
      status: 'ERROR',
      message: err
    });
  } else if (typeof err === 'undefined') {
    res.status(500)
      .send({ message: 'INTERNAL_ERROR' });
  } else {
    res.status(400)
      .send({ message: `${typeof err.code !== 'undefined' ? ' - ' + err.code : ''}${err.message}` });
  }
}

export const handleSuccess = (res: Response, message: string | {}): void => {
  res.status(200).send({
    status: 'OK',
    result: message
  });
}