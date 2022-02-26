import Ajv, { JSONSchemaType } from "ajv";

export interface CreateUserAuthenticatedDTO {
  uid: string;
  username: string;
}

const userAuthenticatedSchema: JSONSchemaType<CreateUserAuthenticatedDTO> = {
  type: "object",
  properties: {
      uid: {type: "string"},
      username: {type: "string", minLength: 4},
  },
  required: ["uid", "username"],
  additionalProperties: false
}

export const CreateAuthenticatedUserValidator = new Ajv().compile(userAuthenticatedSchema)