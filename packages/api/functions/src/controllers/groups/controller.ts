import {Request, Response} from "express";
import {GroupEntity} from "../../entities/Group";
import {handleError, handleSuccess} from "../../utils";
import {CreateGroupDTO, GroupDTO, UpsertGroupDTO} from "../../dtos";
import { Repository } from "../../repository";


export const CreateGroup = async (req: Request, res: Response) => {
    const createGroupDTO: CreateGroupDTO = req.body;

    const uid: string = res.locals.uid;
    const newGroup: GroupEntity = {
        isDeleted: false,
        name: createGroupDTO.name,
        ownerId: uid,
        tagNames: createGroupDTO.tagNames
    }

    if (createGroupDTO.parentId) {
        const parentGroup = await Repository.Group.doc(createGroupDTO.parentId).get();
        if (!parentGroup.exists) {
            return handleError(res, "parentId not exist");
        }

        newGroup.parentId = parentGroup.id;
    }

    const groupHasNameWithUserId = await Repository.Group.where("ownerId", "==", uid)
        .where("name", "==", createGroupDTO.name).get();

    if (groupHasNameWithUserId.size > 0) {
        return handleError(res, `you already created this group with name ${createGroupDTO.name}`);
    }

    const result = await Repository.Group.add(newGroup);
    return handleSuccess(res, `group '${result.id}' is created`);
}

export const GetGroups = async (req: Request, res: Response) => {
    const pageNumber: number = parseInt(<string>req.query['pageNumber'], 10) || 0;
    const pageSize: number = parseInt(<string>req.query['pageSize'], 10) || 10;

    const offset = pageSize * pageNumber;

    const query = Repository.Group.where("isDeleted", "==", false).limit(pageSize).offset(offset);
    const groups = await query.get();
    const datas = groups.docs.map<GroupEntity>((group) => group.data());

    return res.status(200).send(datas);
}

export const GetGroup = async (req: Request, res: Response) => {
    const {id} = req.params;

    const group = await Repository.Group.doc(id).get();
    const groupData = group.data();

    if (!group.exists || groupData === undefined) {
        return handleError(res, "group id not exist");
    }

    const groupDTO: GroupDTO = {
        createdAt: group.createTime,
        updatedAt: group.updateTime,
        ...groupData
    }

    return res.status(200).send(groupDTO);
}

export const UpsertGroup = async (req: Request, res: Response) => {
    const {id} = req.params;
    const upsertGroupDTO: UpsertGroupDTO = req.body;

    const uid: string = res.locals.uid;
    const data: GroupEntity = {
        ownerId: uid,
        name: upsertGroupDTO.name,
        tagNames: upsertGroupDTO.tagNames
    }

    const group = await Repository.Group.doc(id).get();
    if (!group.exists) {
        return handleError(res, `Group Id '${id}' does not exists`);
    }

    if (group.data()?.ownerId !== uid) {
        return handleError(res, "you do not have permission to do this operator");
    }

    if (upsertGroupDTO.parentId) {
        const parentGroup = await Repository.Group.doc(upsertGroupDTO.parentId).get();
        if (!parentGroup.exists) {
            return handleError(res, "parentId not exist");
        }

        data.parentId = parentGroup.id;
    }

    const result = await Repository.Group.doc(id).update(data);
    return handleSuccess(res, `Group Id '${id}' update success at '${result.writeTime}`);
}

export const DeleteGroup = async (req: Request, res: Response) => {
    const {id} = req.params;

    const group = await Repository.Group.doc(id).get();
    if (!group.exists) {
        return handleError(res, `space Id '${id}' does not exists`);
    }

    await Repository.Group.doc(id).update({isDeleted: true});
    return handleSuccess(res, `space Id '${id}' was deleted`);
}
