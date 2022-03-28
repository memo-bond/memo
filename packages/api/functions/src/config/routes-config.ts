import { Application } from "express";
import { ROLES } from "../constants";
import { CreateGroup, DeleteGroup, GetGroup, GetGroups, UpsertGroup } from "../controllers/groups/controller";
import { GetMemo, SaveMemo } from "../controllers/memos/controller";
import { CreateSpace, DeleteSpace, GetSpace, InitDefaultSpace, UpdateSpace } from '../controllers/spaces/controller';
import { CreateUser, GetAll, GetUser, Login, PatchUser, RemoveUser } from "../controllers/users/controller";
import { CreateAuthenticatedUser } from "../controllers/users/create-authenticated-user";
import * as validateSchema from "../dtos";
import { isAuthenticated } from "../middlewares/auth/authenticated";
import { isAuthorized } from "../middlewares/auth/authorized";
import { Validate } from "../middlewares/validation.mdw";
import { Welcome } from './welcome';

export const routesConfig = (app: Application) => {
    app.get('/welcome', Welcome);

    app.post('/memos', isAuthenticated, SaveMemo)

    app.get('/memos/:id', GetMemo)

    app.post('/groups', isAuthenticated, Validate(validateSchema.createGroupSchema), CreateGroup)

    app.get('/groups', GetGroups)

    app.get('/groups/:id', GetGroup)

    app.put('/groups/:id', isAuthenticated, Validate(validateSchema.upsertGroupSchema), UpsertGroup)

    app.delete('/groups/:id', isAuthenticated, DeleteGroup)

    // Space
    app.post('/spaces', isAuthenticated, Validate(validateSchema.createSpaceSchema), CreateSpace);

    app.delete('/spaces', isAuthenticated, DeleteSpace);

    app.put('/spaces/:id', isAuthenticated, Validate(validateSchema.createSpaceSchema), UpdateSpace);

    app.get('/spaces/:id', isAuthenticated, GetSpace);
    // --------------------------------

    app.post('/users/login',
        Login
    );
    app.post('/users',
        Validate(validateSchema.createUserValidator),
        CreateUser
    );
    app.post('/authenticated-users',
        isAuthenticated,
        Validate(validateSchema.createAuthenticatedUserValidator),
        CreateAuthenticatedUser,
        InitDefaultSpace,
    );
    app.get('/users', [
        isAuthenticated,
        isAuthorized({ hasRole: [ROLES.ADMIN, ROLES.SUPER_ADMIN] }),
        GetAll
    ]);
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [ROLES.ADMIN, ROLES.SUPER_ADMIN], allowSameUser: true }),
        GetUser
    ]);
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [ROLES.ADMIN, ROLES.SUPER_ADMIN], allowSameUser: true }),
        PatchUser
    ]);
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [ROLES.ADMIN, ROLES.SUPER_ADMIN], allowSameUser: true }),
        RemoveUser
    ]);
}