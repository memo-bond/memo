import { Request, Response } from "express";
import { Repository} from "..";
import { GroupEntity} from "../entities/Group";
import { handleError, handleSuccess } from "../utils";
import {CreateGroupDTO, GroupDTO, UpsertGroupDTO} from "../dtos";


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

        const findParentQuery = Repository.Group.doc(createGroupDTO.parentId);
        findParentQuery.onSnapshot((parentGroup) => {
            if (!parentGroup.exists) {
                return handleError(res, "parentId not exist");
            }
        })

        newGroup.parentId = findParentQuery.id;
    }

    const result = await Repository.Group.add(newGroup);
    return handleSuccess(res, `group '${result.id}' is created`);
}

export const GetGroups = async (req: Request, res: Response) => {
    const pageNumber: number = parseInt(<string>req.query['pageNumber'], 10) || 0;
    const pageSize: number = parseInt(<string>req.query['pageSize'], 10) || 10;

    const offset = pageSize * pageNumber;

    const query = Repository.Group.limit(pageSize).offset(offset);
    const groups = await query.get();
    const datas = groups.docs.map<GroupEntity>((group) => group.data());

    return res.status(200).send(datas);
}

export const GetGroup = async (req: Request, res: Response) => {
    const { id } = req.params;

    const query = Repository.Group.doc(id);
    const group = await query.get();
    const groupData = group.data();

    if (!group.exists || groupData === undefined ) {
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
    const { id } = req.params;
    const upsertGroupDTO: UpsertGroupDTO = req.body;

    const uid: string = res.locals.uid;
    const data: GroupEntity = {
        ownerId: uid,
        name: upsertGroupDTO.name,
        tagNames: upsertGroupDTO.tagNames
    }

    const groupRef = Repository.Group.doc(id);
    groupRef.onSnapshot(async (group) => {
        if (group.exists) {
            if (group.data()?.ownerId !== uid) {
                return handleError(res, "you do not have permission to do this operator");
            }

            if (upsertGroupDTO.parentId) {
                const parentGroup = Repository.Group.doc(upsertGroupDTO.parentId);
                parentGroup.onSnapshot((next) => {
                    if (!next.exists) {
                        return handleError(res, "parentId not exist");
                    }
                })

                data.parentId = parentGroup.id;
            }

            await groupRef.update(data);
            return handleSuccess(res, `Group Id '${id}' update success`);
        } else {
            return handleError(res, `Group Id '${id}' does not exists`);
        }
    });
}

export const DeleteGroup = async (req: Request, res: Response) => {
    const { id } = req.params;

    const findQuery = Repository.Group.doc(id);
    findQuery.onSnapshot((space) => {
        if (space.exists) {
            findQuery.update({isDeleted: true});
            return handleSuccess(res, `space Id '${id}' was deleted`);
        } else {
            return handleError(res, `space Id '${id}' does not exists`);
        }
    });
}
