import { Response } from 'express';

export const handleError = (res: any, err: any | string): void => {
  if (typeof err === 'string') {
    res.status(400).send({
      status: 'ERROR',
      message: err
    });
  } else {
    res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
}

export const handleSuccess = (res: Response, message: string): void => {
  res.status(200).send({
    status: 'OK',
    message
  });
}