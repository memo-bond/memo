import { Request, Response } from 'express';
import { MemoRepository } from '../../repository';
import { handleError, handleSuccess } from '../../utils';

export const SaveMemo = async (req: Request, res: Response) => {
    const { cells } = req.body;
    if (!cells) {
        return handleError(res, 'Missing fields');
    }
    await MemoRepository.doc('o99xBoZdtpjFo8qsq9JG').set({ cells });
    return handleSuccess(res, 'memo is saved');
}

export const GetMemo = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`id ${id}`);
    
    if (!id) {
        return handleError(res, 'Missing query params');
    }
    MemoRepository.doc(id as string).onSnapshot((s) => {
        return res.status(200).send(s.data());
    });
}
