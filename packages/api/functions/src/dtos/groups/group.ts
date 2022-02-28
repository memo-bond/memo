import {BaseEntity} from "../../entities/BaseEntity";
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;

export interface GroupDTO extends BaseEntity{
    ownerId: string,
    name: string,
    parentId?: string | null,
    tagNames?: Array<string> | null,
    readPermissionUserIds?: Array<string> | null,
    writePermissionUserIds?: Array<string> | null,
    createdAt: Timestamp | undefined,
    updatedAt: Timestamp | undefined
}