import Ajv, { JSONSchemaType } from "ajv"
import {Model} from "@memo-bond/common/src/models/Entities";

interface GroupCreateModel extends Model.Group {
    spaceId: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const schemaCreate: JSONSchemaType<GroupCreateModel> = {
    type: "object",
    properties: {
        name: { type: "string" }, // todo apply pattern
        spaceId: { type: "string" },
        parentId: { type: "string", nullable: true },
        tags: { type: "array", nullable: true  },
        sharing: { type: "string", nullable: true, default: '' }
    },
    required: ["name", "spaceId"],
    additionalProperties: true
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const schemaUpdate: JSONSchemaType<Model.Group> = {
    type: "object",
    properties: {
        name: { type: "string" }, // todo apply pattern
        parentId: { type: "string", nullable: true },
        tags: { type: "array", nullable: true  },
        sharing: { type: "string", nullable: true, default: '' }
    },
    required: ["name"],
    additionalProperties: true
}

export const createGroupValidator = new Ajv().compile(schemaCreate)
export const updateGroupValidator = new Ajv().compile(schemaUpdate)