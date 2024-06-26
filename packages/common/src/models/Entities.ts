export namespace Model {

  /**
   * shared mechanism: 
   *  - store ReGex string to match Authenticator with this resource
   *  - default value null means public internet
   *  - * means public for Authenticated Users
   *  - '' means private - only owner can see
   * createdBy & updatedBy should be email
   */

  interface SoftDeleteable {
    isDeleted: boolean;
  }

  interface BaseModel {
    id?: string;
    userId?: string;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string;
    updatedBy?: string;
  }

  interface Sharing {
    sharing: string | null;
  }

  /**
   * username:
   *  - SEO URL
   *  - should be unique entire DB
   *  - avoid bad words as much as possible
   * email:
   *  - unique: it is handled by firebase authentication
   */
  export interface User extends BaseModel, Sharing, SoftDeleteable {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    github?: string;
    linkedIn?: string;
    spaces: Space[];
  }

  /**
   * name:
   *  - is unique in user scope
   *  - using for SEO URL
   * md: markdown
   */
  export interface Space extends BaseModel, Sharing {
    name: string;
    description: string | undefined;
    md?: string;
    groups?: Group[] | null;
  }

  export interface Group extends BaseModel, Sharing {
    name: string;
    parentId?: string;
    tags?: string[];
  }

  /**
   * Memo is a separated DB collection
   */
  export interface Memo extends BaseModel, Sharing, SoftDeleteable {
    name: string | null;
    content: string;
    groupId: string;
    tags?: string[];
  }
}