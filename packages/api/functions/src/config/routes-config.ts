import { Application } from "express";
import { login, CreateUser, GetAll, GetUser, PatchUser, RemoveUser } from "../users/controller";
import { CreateSpace, DeleteSpace, GetSpace, UpdateSpace } from '../spaces/controller';
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import { Roles } from "../constants";
import { Validate } from "../middlewares/validation.mdw";
import { createUserRequestValidator } from "../dtos/users";

export function routesConfig(app: Application) {
    app.post('/spaces', isAuthenticated, CreateSpace);

    app.delete('/spaces', isAuthenticated, DeleteSpace);

    app.put('/spaces', isAuthenticated, UpdateSpace);

    app.get('/spaces', isAuthenticated, GetSpace);

    app.post('/users/login',
        login
    );
    app.post('/users',
        Validate(createUserRequestValidator),
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