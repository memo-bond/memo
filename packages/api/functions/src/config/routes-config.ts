import { Application } from "express";
import { login, CreateUser, GetAll, GetUser, PatchUser, RemoveUser } from "../users/controller";
import { CreateSpace, DeleteSpace, GetSpace, UpdateSpace } from '../spaces/controller';
import {CreateGroup, DeleteGroup, GetGroup, GetGroups, UpsertGroup} from "../groups/controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import { Roles } from "../constants";
import { Validate } from "../middlewares/validation.mdw";
import * as validateSchema from "../dtos";

export function routesConfig(app: Application) {

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
        login
    );
    app.post('/users',
        Validate(validateSchema.createUserSchema),
        CreateUser
    );
    app.get('/users', [
        isAuthenticated,
        isAuthorized({ hasRole: [ Roles.ADMIN, Roles.MANAGER] }),
        GetAll
    ]);
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [ Roles.ADMIN, Roles.MANAGER], allowSameUser: true }),
        GetUser
    ]);
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [ Roles.ADMIN, Roles.MANAGER], allowSameUser: true }),
        PatchUser
    ]);
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [ Roles.ADMIN, Roles.MANAGER], allowSameUser: true }),
        RemoveUser
    ]);
}