import Ajv, { JSONSchemaType } from "ajv"

export interface CreateBookDTO {
    name: string,
    parentId?: string,
    tagNames?: Array<string>
}

const schema: JSONSchemaType<CreateBookDTO> = {
    type: "object",
    properties: {
        name: { type: "string"},
        parentId: { type: "string", nullable: true },
        tagNames: { type: "array", nullable: true  },
    },
    required: ["name"],
    additionalProperties: false
}

export const createBookSchema = new Ajv().compile(schema)