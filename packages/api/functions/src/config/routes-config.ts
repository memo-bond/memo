import { Application } from "express";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import { Roles } from "../constants";
import { CreateAuthenticatedUserValidator } from "../dtos/user-authenticated";
import { createUserValidator } from "../dtos/users";
import { Validate } from "../middlewares/validation.mdw";
import { CreateSpace, DeleteSpace, GetSpace, UpdateSpace } from '../spaces/controller';
import { CreateUser, GetAll, GetUser, Login, PatchUser, RemoveUser } from "../users/controller";
import { CreateAuthenticatedUser } from "../users/create-authenticated-user";

export const routesConfig = (app: Application) => {
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
        Validate(CreateAuthenticatedUserValidator),
        CreateAuthenticatedUser
    );
    app.get('/users', [
        isAuthenticated,
        isAuthorized({ hasRole: [Roles.ADMIN, Roles.MANAGER] }),
        GetAll
    ]);
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [Roles.ADMIN, Roles.MANAGER], allowSameUser: true }),
        GetUser
    ]);
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [Roles.ADMIN, Roles.MANAGER], allowSameUser: true }),
        PatchUser
    ]);
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [Roles.ADMIN, Roles.MANAGER], allowSameUser: true }),
        RemoveUser
    ]);
}