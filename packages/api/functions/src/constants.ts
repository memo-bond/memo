export abstract class CONSTANTS {
  static readonly UNIQUE_USERNAME: string = 'unique_username';

  // db collections
  static readonly USERS: string = 'users';
  static readonly SPACES: string = 'spaces';
  static readonly GROUPS: string = 'groups';
  static readonly MEMOS: string = 'memos';

  static readonly DEFAULT_SPACE = {
    PUBLIC: 'public',
    PRIVATE: 'private',
  }
}

export abstract class ROLES {
  static readonly SUPER_ADMIN: string = 'super_admin';
  static readonly ADMIN: string = 'admin';
  static readonly USER: string = 'user';
}