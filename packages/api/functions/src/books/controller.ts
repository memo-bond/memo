import { Request, Response } from "express";
import {BookRepository } from "..";
import { BookEntity} from "../entities/Book";
import { handleError, handleSuccess } from "../utils";
import {CreateBookDTO} from "../dtos";

export const CreateBook = async (req: Request, res: Response) => {
    const createBookDTO: CreateBookDTO = req.body;

    const uid: string = res.locals.uid;
    const newBook: BookEntity = {
        name: createBookDTO.name,
        ownerId: uid,
        tagNames: createBookDTO.tagNames
    }

    if (createBookDTO.parentId) {
        const parentBook = BookRepository.doc(createBookDTO.parentId);
        if (!parentBook) {
            return handleError(res, "");
        }

        newBook.parentId = parentBook.id;
    }

    const result = await BookRepository.add(newBook);
    return handleSuccess(res, `book Id is created '${result.id}'`);
}
//
// export const DeleteSpace = async (req: Request, res: Response) => {
//     const { id } = req.body;
//     if (!id) {
//         return handleError(res, 'Missing fields');
//     }
//     const spaceRef = SpaceRepository.doc(id);
//     spaceRef.onSnapshot((space) => {
//         if (space.exists) {
//             spaceRef.delete();
//             return handleSuccess(res, `space Id '${id}' was deleted`);
//         } else {
//             return handleError(res, `space Id '${id}' does not exists`);
//         }
//     });
// }
//
// export const UpdateSpace = async (req: Request, res: Response) => {
//     const { id, name } = req.body;
//     if (!id || !name) {
//         return handleError(res, 'Missing fields');
//     }
//     const spaceRef = SpaceRepository.doc(id);
//     spaceRef.onSnapshot((space) => {
//         if (space.exists) {
//             spaceRef.update({ name });
//             return handleSuccess(res, 'updated');
//         } else {
//             return handleError(res, `Space Id '${id}' does not exists`);
//         }
//     });
// }
//
// export const GetSpace = async (req: Request, res: Response) => {
//     const { id } = req.query;
//     if (!id) {
//         return handleError(res, 'Missing fields');
//     }
//     SpaceRepository.doc(id as string).onSnapshot((s) => {
//         return res.status(200).send(s.data());
//     });
// }