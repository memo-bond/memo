import {BaseEntity} from "./BaseEntity";

export interface GroupEntity extends BaseEntity{
    ownerId: string,
    name: string,
    parentId?: string | null,
    tagNames?: Array<string> | null,
    readPermissionUserIds?: Array<string> | null,
    writePermissionUserIds?: Array<string> | null
}
