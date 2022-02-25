export namespace Model {

  /**
   * shared mechanism: 
   *    - store ReGex string to match Authenticator with this resource
   *    - null mean public internet, * mean public for Authenticated Users
   * isDeleted: soft delete
   * createdBy & updatedBy should be email/username
   */
  interface BaseModel {
    id: string;
    ownerId: string;
    isDeleted: boolean;
    shared: string | null;
    createdAt: number;
    updatedAt: number;
    createdBy: string;
    updatedBy: string;
  }

  /**
   * username:
   *  - SEO URL
   *  - should be unique entire DB
   */
  export interface User extends BaseModel {
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
  export interface Space {
    name: string;
    description: string;
    md: string;
    groups: Group[] | null;
  }

  export interface Group {
    name: string;
    parentId?: string;
    tags?: string[];
  }

  /**
   * Memo is a separated DB collection
   */
  export interface Memo extends BaseModel {
    name: string | null;
    content: string;
    groupId: string;
    tags?: string[];
  }
}