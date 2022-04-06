import {Request, Response} from "express";
import {GroupRepository} from '../../index';
import {handleError, handleSuccess, required} from "../../utils";

export const createGroup = async (req: Request, res: Response) => {
    try {
        const {name, spaceId, parentId, tags, sharing} = req.body;

        const groupRef = await GroupRepository(res, spaceId);
        if (parentId) {
            const parentSnapshot = await groupRef.doc(parentId).get();
            if (!parentSnapshot.exists) {
               throw(`Group parent id ${parentId} does not exist`);
            }
        }
        const groupDocRef = groupRef.where("parentId", "==", parentId).where("name", "==", name);
        if ((await groupDocRef.get()).size > 0) {
            throw(`Group ${name} already exists`);
        }

        const newGroupDocRef = await groupRef.add({
            name,
            parentId,
            tags,
            sharing
        });
        return handleSuccess(res, (await newGroupDocRef.get()).data());
    } catch(err: any) {
        return handleError(res, err);
    }
}

export const getGroups = async (req: Request, res: Response) => {
    // const pageNumber: number = parseInt(<string>req.query['pageNumber'], 10) || 0;
    // const pageSize: number = parseInt(<string>req.query['pageSize'], 10) || 10;

    // const offset = pageSize * pageNumber;

    // const query = Repository.Group.where("isDeleted", "==", false).limit(pageSize).offset(offset);
    // const groups = await query.get();
    // const datas = groups.docs.map<GroupEntity>((group) => group.data());

    return handleSuccess(res, {});
}

export const getGroup = async (req: Request, res: Response) => {
    try {
        const {id, spaceId} = req.params;
        required(id, spaceId);

        const groupRef = await GroupRepository(res, spaceId);
        const groupSnapshot = await groupRef.doc(id).get();
        if (!groupSnapshot.exists) {
            throw(`group ${id} not exist`);
        }
        return handleSuccess(res, groupSnapshot.data());
    } catch (err: any) {
        return handleError(res, err);
    }
}

export const updateGroup = async (req: Request, res: Response) => {
    try {
        const {id, spaceId} = req.params;
        required(id, spaceId);
        const {name, tags, sharing} = req.body;

        const groupRef = await GroupRepository(res, spaceId);
        const groupDocRef = groupRef.doc(id);
        if (!(await groupDocRef.get()).exists) {
            throw(`Group id ${id} does not exist`);
        }
        groupDocRef.update({
            name,
            tags,
            sharing
        });
        
        return handleSuccess(res, (await groupDocRef.get()).data());
    } catch (err: any) {
        return handleError(res, err);
    }
}

export const deleteGroup = async (req: Request, res: Response) => {
    try {
        const {id, spaceId} = req.params;
        required(id, spaceId);

        const groupRef = await GroupRepository(res, spaceId);
        const groupDocRef = groupRef.doc(id);
        if (!(await groupDocRef.get()).exists) {
            throw(`Group Id '${id}' does not exists`);
        }
        await groupDocRef.delete();

        return handleSuccess(res, `Group Id '${id}' was deleted`);
    } catch (err: any) {
        return handleError(res, err);
    }
}
