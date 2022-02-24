import { Request, Response } from "express";
import { SpaceRepository } from "..";
import { handleError, handleSuccess } from "../utils";

export const CreateSpace = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return handleError(res, 'Missing fields');
    }
    const result = await SpaceRepository.add({ name });
    return handleSuccess(res, `space Id is created '${result.id}'`);
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