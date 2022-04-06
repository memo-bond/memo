import {Request, Response} from 'express';
import {SpaceRepository, database as db} from '../../index';
import {CONSTANTS, CONTENT, REGEX} from '../../constants';
import {handleError, handleSuccess, required} from '../../utils';
import {Model} from "@memo-bond/common/src/models/Entities";

/*
    --- SPACE CRUD ---
    *note*: each space document has name as id
*/

export const createSpace = async (req: Request, res: Response) => {
    try {
        const {name, md, description, sharing} = req.body;

        const spaceDocRef = SpaceRepository(res).doc(name);
        if ((await spaceDocRef.get()).exists) {
            throw(`Space ${name} already exists`);
        }
        await spaceDocRef.set({
            name,
            md,
            description,
            sharing
        });

        return handleSuccess(res, (await spaceDocRef.get()).data());
    } catch (err: any) {
        return handleError(res, err);
    }
}

export const initDefaultSpace = async (req: Request, res: Response) => {
    try {
        const pubSpaceId = await initSpace(res, CONSTANTS.DEFAULT_SPACE.PUBLIC, REGEX.SHARING.PUBLIC);
        const priSpaceId = await initSpace(res, CONSTANTS.DEFAULT_SPACE.PRIVATE, REGEX.SHARING.PRIVATE);

        const responseMsg = {
            message: 'Default spaces are created successful',
            pubSpaceId, priSpaceId
        };
        console.log(`responseMsg : ${JSON.stringify(responseMsg)}`);
        return handleSuccess(res, responseMsg);
    } catch (err: any) {
        return handleError(res, err);
    }
}

const initSpace = async (res: Response, name: string, sharing: string): Promise<string> => {
    const spaceDocRef = SpaceRepository(res).doc(name);
    const spaceEntity: Model.Space = {
        name,
        sharing,
        md: CONTENT.DEFAULT_SPACE_MD,
        description: CONTENT.DEFAULT_SPACE_MD
    }
    const result = await spaceDocRef.set(spaceEntity);
    console.log(`Init space result ${JSON.stringify(result)}`);

    return spaceDocRef.id;
}

export const deleteSpace = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        required(id);

        const spaceDocRef = SpaceRepository(res).doc(id);
        if ((await spaceDocRef.get()).exists) {
            spaceDocRef.delete();
            return handleSuccess(res, `Space Id '${id}' was deleted`);
        }
        throw(`Space Id '${id}' does not exists`);
    } catch (err: any) {
        return handleError(res, err);
    }
}

export const updateSpace = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        required(id);

        const {name, md, description, sharing} = req.body;
        const spaceRef = SpaceRepository(res);
        const spaceDocRef = spaceRef.doc(id);
        const spaceSnapshot = await spaceDocRef.withConverter(null).get();
        if (!spaceSnapshot.exists) {
            throw(`Space Id '${id}' does not exists`);
        }

        const spaceToUpdate: Model.Space = {
            name,
            md,
            description,
            sharing
        }

        if (id === name) {
            await spaceDocRef.update(spaceToUpdate);
            return handleSuccess(res, (await spaceDocRef.get()).data());
        }

        const newSpaceDocRef = spaceRef.doc(name);

        const newSpaceSnapshot = await newSpaceDocRef.withConverter(null).get();
        if (newSpaceSnapshot.exists) {
            throw(`Space with name '${name}' already exists`);
        }

        await db.runTransaction(async (transaction) => {
            transaction.set(newSpaceDocRef, {...spaceSnapshot.data(), ...spaceToUpdate});
            transaction.delete(spaceDocRef)
        });
        
        return handleSuccess(res, (await newSpaceDocRef.get()).data());
    } catch (err: any) {
        return handleError(res, err);
    }
}

export const getSpace = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        required(id);

        const spaceEntity = await SpaceRepository(res).doc(id).get();
        if (!spaceEntity.exists) {
            throw(`Space '${id} does not exist`);
        }

        return handleSuccess(res, spaceEntity.data());  
    } catch (err: any) {
        return handleError(res, err);
    }
}