import {Request, Response} from 'express';
import {CONSTANTS, CONTENT} from '../../constants';
import {handleError, handleSuccess} from '../../utils';
import {SpaceEntity} from "../../entities/Space";
import {CreateSpaceDTO} from "../../dtos";
import {firestore} from "firebase-admin";
import DocumentReference = firestore.DocumentReference;
import { Repository, SpaceRepository, UserRepository } from '../../repository';

export const CreateSpace = async (req: Request, res: Response) => {
    console.log(`Create Space res.locals ${JSON.stringify(res.locals)}`);
    const createSpaceDTO: CreateSpaceDTO = req.body;
    const uid: string = res.locals.uid;
    const spaceEntity: SpaceEntity = {
        ownerId: uid,
        name: createSpaceDTO.name,
        md: createSpaceDTO.md,
        description: createSpaceDTO.description,
        isDeleted: false,
        isVisible: createSpaceDTO.isVisible || true,

    }
    const result = await Repository.Space.add(spaceEntity);
    return handleSuccess(res, `space Id is created '${result.id}'`);
}

export const InitDefaultSpace = async (req: Request, res: Response) => {
    const {uid} = res.locals;
    const userRef = UserRepository.doc(uid);
    try {
        const pubSpaceId = await initSpace(userRef, uid, CONSTANTS.DEFAULT_SPACE.PUBLIC, true);
        const priSpaceId = await initSpace(userRef, uid, CONSTANTS.DEFAULT_SPACE.PRIVATE, false);

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

const initSpace = async (userRef: DocumentReference, ownerId: string, spaceName: string, isVisible: boolean): Promise<string> => {
    const spaceRef = userRef.collection(CONSTANTS.SPACES).doc(spaceName);
    const spaceEntity: SpaceEntity = {
        ownerId: ownerId,
        name: spaceName,
        md: CONTENT.DEFAULT_SPACE_MD,
        description: CONTENT.DEFAULT_SPACE_MD,
        isDeleted: false,
        isVisible: isVisible,
    }
    const result = await spaceRef.set(spaceEntity);
    console.log(`Init space result ${JSON.stringify(result)}`);

    return spaceRef.id;
}

export const DeleteSpace = async (req: Request, res: Response) => {
    const {id} = req.body;
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
    const {id} = req.params;
    const uid: string = res.locals.uid;
    const upsertSpaceDTO: CreateSpaceDTO = req.body;

    const space = await Repository.Space.doc(id).get();
    if (!space.exists) {
        return handleError(res, `Space Id '${id}' does not exists`);
    }

    if (space.data()?.ownerId !== uid) {
        return handleError(res, "you do not have permission to do this operator");
    }

    const spaceEntity: SpaceEntity = {
        ownerId: uid,
        name: upsertSpaceDTO.name,
        md: upsertSpaceDTO.md,
        description: upsertSpaceDTO.description,
        isDeleted: false,
        isVisible: upsertSpaceDTO.isVisible || space.data()?.isVisible || true,
    }

    const result = await Repository.Group.doc(id).update(spaceEntity);
    return handleSuccess(res, `Group Id '${id}' update success at '${result.writeTime}`);
}

export const GetSpace = async (req: Request, res: Response) => {
    const {id} = req.params;
    const spaceEntity = await Repository.Space.doc(id).get();
    if (!spaceEntity.exists) {
        return handleError(res, `Space '${id} not found`);
    }

    return res.status(200).send(spaceEntity.data());
}