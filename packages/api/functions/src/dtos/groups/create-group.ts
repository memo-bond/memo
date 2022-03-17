import Ajv, { JSONSchemaType } from "ajv"

export interface CreateGroupDTO {
    name: string,
    parentId?: string,
    tagNames?: Array<string>
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const schema: JSONSchemaType<CreateGroupDTO> = {
    type: "object",
    properties: {
        name: { type: "string"},
        parentId: { type: "string", nullable: true },
        tagNames: { type: "array", nullable: true  },
    },
    required: ["name"],
    additionalProperties: false
}

export const createGroupSchema = new Ajv().compile(schema)