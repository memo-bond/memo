import Ajv, { JSONSchemaType } from "ajv"

export interface CreateSpaceDTO {
    name: string,
    md?: string,
    description?: string,
    isVisible?: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const schema: JSONSchemaType<CreateSpaceDTO> = {
    type: "object",
    properties: {
        name: { type: "string"},
        md: { type: "string", nullable: true },
        description: { type: "string", nullable: true  },
        isVisible: { type: "boolean", nullable: true, default: true }
    },
    required: ["name"],
    additionalProperties: false
}

export const createSpaceSchema = new Ajv().compile(schema)