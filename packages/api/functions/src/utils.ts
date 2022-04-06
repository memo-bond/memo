import { Response } from 'express';

export const handleError = (res: Response, err: any): void => {
  if (typeof err === 'string') {
    res.status(400).send({
      status: 'ERROR',
      message: err
    });
    return;
  }

  if (err instanceof Error) { 
    console.error(err.stack)
  }
  
  res.status(500).send({
    status: 'ERROR',
    message: 'INTERNAL_ERROR'
  });
}

export const handleSuccess = (res: Response, message: any): void => {
  res.status(200).send({
    status: 'OK',
    result: message
  });
}

export const required = (...fields: string[]) => {
  for (let field of fields) {
    if (!field) {
      throw('Missing fields')
    }
  }
}