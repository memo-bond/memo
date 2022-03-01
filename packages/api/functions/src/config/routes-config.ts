import { Application } from "express";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import { ROLES } from "../constants";
import { CreateAuthenticatedUserValidator } from "../dtos/user-authenticated";
import { createUserValidator } from "../dtos/users";
import { Validate } from "../middlewares/validation.mdw";
import { CreateSpace, DeleteSpace, GetSpace, InitDefaultSpace, UpdateSpace } from '../spaces/controller';
import { CreateUser, GetAll, GetUser, Login, PatchUser, RemoveUser } from "../users/controller";
import {CreateGroup, DeleteGroup, GetGroup, GetGroups, UpsertGroup} from "../groups/controller";
import { CreateAuthenticatedUser } from "../users/create-authenticated-user";
import * as validateSchema from "../dtos";

export const routesConfig = (app: Application) => {
    app.post('/groups', isAuthenticated, Validate(validateSchema.createGroupSchema), CreateGroup)

    app.get('/groups', GetGroups)

    app.get('/groups/:id', GetGroup)

    app.put('/groups/:id', isAuthenticated, Validate(validateSchema.upsertGroupSchema), UpsertGroup)

    app.delete('/groups/:id', isAuthenticated, DeleteGroup)

    app.post('/spaces', isAuthenticated, CreateSpace);

    app.delete('/spaces', isAuthenticated, DeleteSpace);

    app.put('/spaces', isAuthenticated, UpdateSpace);

    app.get('/spaces', isAuthenticated, GetSpace);

    app.post('/users/login',
        Login
    );
    app.post('/users',
        Validate(createUserValidator),
        CreateUser
    );
    app.post('/authenticated-users',
        isAuthenticated,
        Validate(CreateAuthenticatedUserValidator),
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