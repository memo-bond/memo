export interface BookEntity {
    ownerId: string,
    name: string,
    parentId?: string,
    tagNames?: Array<string>,
    readPermissionUserIds?: Array<string>,
    writePermissionUserIds?: Array<string>
}