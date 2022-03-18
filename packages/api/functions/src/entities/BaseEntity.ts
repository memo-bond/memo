// import {firestore} from "firebase-admin";
// import Timestamp = firestore.Timestamp;

export interface BaseEntity {
    id?: string,
    isDeleted?: boolean
}

export interface Shareable {
    userId?: string | null,
    email?: string | null,
    permission: ResourcePermission[]
}

export interface ResourceScope {
    prefixPath?: string | null,
    userId?: string | null,
    email?: string | null
}

export enum ResourcePermission {
    Read,
    Write,
}