import { Application } from "express";
import { ROLES } from "../constants";
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from "../controllers/groups/controller";
import { getMemo, saveMemo } from "../controllers/memos/controller";
import { createSpace, deleteSpace, getSpace, initDefaultSpace, updateSpace } from '../controllers/spaces/controller';
import { createUser, getAll, getUser, login, patchUser, removeUser } from "../controllers/users/controller";
import { createAuthenticatedUser } from "../controllers/users/create-authenticated-user";
import * as validateSchema from "../jschema";
import { isAuthenticated } from "../middlewares/auth/authenticated";
import { isAuthorized } from "../middlewares/auth/authorized";
import { Validate } from "../middlewares/validation.mdw";
import { Welcome } from './welcome';

export const routesConfig = (app: Application) => {
    app.get('/welcome', Welcome);

    app.post('/memos', isAuthenticated, saveMemo)

    app.get('/memos/:id', getMemo)

    app.post('/spaces', isAuthenticated, Validate(validateSchema.createSpaceValidator), createSpace);

    app.delete('/spaces/:id', isAuthenticated, deleteSpace);

    app.put('/spaces/:id', isAuthenticated, Validate(validateSchema.createSpaceValidator), updateSpace);

    app.get('/spaces/:id', isAuthenticated, getSpace);

    app.post('/spaces/:spaceId/groups', isAuthenticated, Validate(validateSchema.createGroupValidator), createGroup)

    app.get('/spaces/:spaceId/groups', isAuthenticated, getGroups)

    app.get('/spaces/:spaceId/groups/:id', isAuthenticated, getGroup)

    app.put('/spaces/:spaceId/groups/:id', isAuthenticated, Validate(validateSchema.updateGroupValidator), updateGroup)

    app.delete('/spaces/:spaceId/groups/:id', isAuthenticated, deleteGroup)


    app.post('/users/login',
        login
    );
    app.post('/users',
        Validate(validateSchema.createUserValidator),
        createUser
    );
    app.post('/authenticated-users',
        isAuthenticated,
        Validate(validateSchema.createAuthenticatedUserValidator),
        createAuthenticatedUser,
        initDefaultSpace,
    );
    app.get('/users', [
        isAuthenticated,
        isAuthorized({ hasRole: [ROLES.ADMIN, ROLES.SUPER_ADMIN] }),
        getAll
    ]);
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [ROLES.ADMIN, ROLES.SUPER_ADMIN], allowSameUser: true }),
        getUser
    ]);
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [ROLES.ADMIN, ROLES.SUPER_ADMIN], allowSameUser: true }),
        patchUser
    ]);
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: [ROLES.ADMIN, ROLES.SUPER_ADMIN], allowSameUser: true }),
        removeUser
    ]);


    // handle request not found
    app.use(function(req, res, next) {
        res.status(404);
        res.send({
            status: 'ERROR',
            message: 'REQUEST NOT FOUND'});
    });
}