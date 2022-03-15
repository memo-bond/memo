import { Request, Response } from 'express';
import { Model } from '@memo-bond/common/src/models/Entities';
import { SpaceRepository, UserRepository } from '..';
import { CONSTANTS } from '../constants';
import { handleError, handleSuccess } from '../utils';

export const CreateSpace = async (req: Request, res: Response) => {
    console.log(`Create Space res.locals ${JSON.stringify(res.locals)}`);
    const { name } = req.body;
    if (!name) {
        return handleError(res, 'Missing fields');
    }
    const result = await SpaceRepository.add({ name });
    return handleSuccess(res, `space Id is created '${result.id}'`);
}

export const InitDefaultSpace = async (req: Request, res: Response) => {
    const { uid } = res.locals;
    const userRef = UserRepository.doc(uid);
    try {
        const pubSpaceId = await initSpace(userRef, CONSTANTS.DEFAULT_SPACE.PUBLIC, '**');
        const priSpaceId = await initSpace(userRef, CONSTANTS.DEFAULT_SPACE.PRIVATE, '');

        const responseMsg = {
            message: 'Default spaces are created successful',
            pubSpaceId, priSpaceId
        };
        console.log(`responseMsg : ${JSON.stringify(responseMsg)}`);
        return handleSuccess(res, responseMsg);
    } catch (err: any) {
        console.error('Error while init default spaces due to: ', err.message);
        return handleError(res, err);
    }
}

const initSpace = async (userRef: any, spaceName: string, sharing: string): Promise<string> => {
    const spaceRef = userRef.collection(CONSTANTS.SPACES).doc(spaceName);
    const space: Model.Space = {
        name: spaceName,
        description: spaceName,
        sharing,
    };
    const result = await spaceRef.set(space);
    console.log(`Init space result ${JSON.stringify(result)}`);
    
    return spaceRef.id;
}

export const DeleteSpace = async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
        return handleError(res, 'Missing fields');
    }
    const spaceRef = SpaceRepository.doc(id);
    spaceRef.onSnapshot((space) => {
        if (space.exists) {
            spaceRef.delete();
            return handleSuccess(res, `space Id '${id}' was deleted`);
        } else {
            return handleError(res, `space Id '${id}' does not exists`);
        }
    });
}

export const UpdateSpace = async (req: Request, res: Response) => {
    const { id, name } = req.body;
    if (!id || !name) {
        return handleError(res, 'Missing fields');
    }
    const spaceRef = SpaceRepository.doc(id);
    spaceRef.onSnapshot((space) => {
        if (space.exists) {
            spaceRef.update({ name });
            return handleSuccess(res, 'updated');
        } else {
            return handleError(res, `Space Id '${id}' does not exists`);
        }
    });
}

export const GetSpace = async (req: Request, res: Response) => {
    const { id } = req.query;
    if (!id) {
        return handleError(res, 'Missing fields');
    }
    SpaceRepository.doc(id as string).onSnapshot((s) => {
        return res.status(200).send(s.data());
    });
}