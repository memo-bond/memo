import Ajv, { JSONSchemaType } from "ajv"

export interface CreateUserDTO {
    displayName?: string,
    password: string,
    email: string,
    role: string
}

const schema: JSONSchemaType<CreateUserDTO> = {
    type: "object",
    properties: {
        displayName: { type: "string", nullable: true },
        password: { type: "string" },
        email: { type: "string" },
        role: { type: "string" }
    },
    required: ["email", "password", "role"],
    additionalProperties: false
}

export const createUserSchema = new Ajv().compile(schema)