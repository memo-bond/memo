import { NextFunction, Request, Response } from "express";
import { database as db } from "../../index";
import { CONSTANTS, ROLES } from "../../constants";
import { handleError } from "../../utils";

abstract class ERROR_MSG {
  static readonly OWNED: string = 'USERNAME_OWNED_BY_REQUESTER';
  static readonly USERNAME_EXISTS: string = 'USERNAME_ALREADY_EXISTS';
  static readonly USER_EXISTS: string = 'USER_ALREADY_EXISTS';
}

type NewUserRequest = {
  uid: string;
  username: string;
}

export const createAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
  const usernames = db.collection(CONSTANTS.UNIQUE_USERNAME);
  const users = db.collection(CONSTANTS.USERS);
  const request: NewUserRequest = req.body;

  const unameRef = usernames.doc(request.username);
  const unameQuery = usernames.where('uid', '==', request.uid);
  const userRef = users.doc(request.uid);
  try {
    const userExists = (await userRef.get()).exists;
    if (userExists) {
      throw ERROR_MSG.USER_EXISTS;
    }
    await db.runTransaction(async (transaction) => {
      return transaction
        .get(unameRef)
        .then((unameDoc) => {
          // check if username is already assigned to the current user
          const userData = unameDoc.data();
          if (unameDoc.exists && userData && userData.uid === request.uid) {
            throw new Error(ERROR_MSG.OWNED);
          }
          // check username exists
          if (unameDoc.exists) {
            throw new Error(ERROR_MSG.USERNAME_EXISTS);
          }
          return Promise.resolve();
        })
        // query username
        .then(() => transaction.get(unameQuery))

        // allow a user to change their username by deleting a previously set one
        // ensure user only has one username by deleting any references found
        // .then((querySnapshot) => {
        // return Promise.all(querySnapshot.docs.map(doc => transaction.delete(doc.ref)))
        // })

        // assign the username to the authenticated user
        .then(() => {
          transaction.set(unameRef, { uid: request.uid })
        })

        // create new user record
        .then(() => {
          transaction.set(userRef, {
            uid: request.uid,
            username: request.username,
            role: ROLES.USER
          })
        })
        .catch((err) => {
          throw err;
        });
    });
    next();
    // return handleSuccess(res, { username: request.username, message: 'The user was successfully created' });
  } catch (err: any) {
    return handleError(res, err);
  }
}
