import { Application } from "express";
import { login, CreateUser, GetAll, GetUser, PatchUser, RemoveUser } from "../users/controller";
import { CreateSpace, DeleteSpace, GetSpace, UpdateSpace } from '../spaces/controller';
import { CreateBook } from "../books/controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import { Validate } from "../middlewares/validation.mdw";
import * as validateSchema from "../dtos";

export function routesConfig(app: Application) {

    app.post('/books', Validate(validateSchema.createBookSchema), CreateBook)

    app.post('/spaces', isAuthenticated, CreateSpace);

    app.delete('/spaces', isAuthenticated, DeleteSpace);

    app.put('/spaces', isAuthenticated, UpdateSpace);

    app.get('/spaces', isAuthenticated, GetSpace);

    app.post('/users/login',
        login
    );

    app.post('/users', Validate(validateSchema.createUserSchema), CreateUser);

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