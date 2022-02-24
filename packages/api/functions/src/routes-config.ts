import { Application } from "express";
import { login, CreateUser, GetAll, GetUser, PatchUser, RemoveUser } from "./users/controller";
import { CreateSpace, DeleteSpace, GetSpace, UpdateSpace } from './spaces/controller';
import { isAuthenticated } from "./auth/authenticated";
import { isAuthorized } from "./auth/authorized";

export function routesConfig(app: Application) {
    app.post('/spaces', isAuthenticated, CreateSpace);

    app.delete('/spaces', isAuthenticated, DeleteSpace);

    app.put('/spaces', isAuthenticated, UpdateSpace);

    app.get('/spaces', isAuthenticated, GetSpace);

    app.post('/users/login',
        login
    );
    app.post('/users',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        CreateUser
    );
    app.get('/users', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        GetAll
    ]);
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        GetUser
    ]);
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        PatchUser
    ]);
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        RemoveUser
    ]);
}