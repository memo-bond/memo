import { Request, Response, NextFunction } from "express";

export function hasRole(roles: Array<'admin' | 'manager' | 'user'>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { role } = res.locals

        if (!role)
            return res.status(403).send();

        if (roles.includes(role)) {
            return next();
        } else {
            return res.status(403).send();
        }
    }
}

export function isAuthorized(opts: { hasRole: Array<'admin' | 'manager' | 'user'>, allowSameUser?: boolean }) {
    return (req: Request, res: Response, next: Function) => {
        const { role, uid } = res.locals
        const { id } = req.params

        if (opts.allowSameUser && id && uid === id)
            return next();

        if (!role)
            return res.status(403).send();

        if (opts.hasRole.includes(role))
            return next();

        return res.status(403).send();
    }
}
