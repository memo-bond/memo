export declare namespace Model {
  interface BaseModel {
    id: string; // unique 
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number;
    createdBy: string | null;
    updatedBy: string | null;
  }

  export interface User extends BaseModel {
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
    github?: string;
    linkedIn?: string;
    books?: string[];
  }

  export interface Book extends BaseModel {
    name: string;
    ownerId: string;
    shared?: string[]; // list ID of Users
    parentId?: string; // null is root
    authorEmail: string;
    authorName?: string;
    tags?: string[];
  }

  export interface JMemo extends BaseModel {
    content: string;
    bookId: string;
    tags?: string[];
  }
}