import Ajv, { JSONSchemaType } from "ajv"
import {Model} from "@memo-bond/common/src/models/Entities";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const schema: JSONSchemaType<Model.Space> = {
    type: "object",
    properties: {
        name: { type: "string"}, // todo apply pattern
        md: { type: "string", nullable: true },
        description: { type: "string", nullable: true  },
        sharing: { type: "string", nullable: true, default: '' }
    },
    required: ["name"],
    additionalProperties: true
}

export const createSpaceValidator = new Ajv().compile(schema)