import {BaseEntity, Shareable} from "./BaseEntity";
import {GroupEntity} from "./Group";

export interface SpaceEntity extends BaseEntity {
    ownerId: string,
    name: string;
    description?: string | null;
    md?: string | null;
    isVisible: boolean;
    groups?: GroupEntity[] | null;
    permission?: Shareable[] | null;
}
