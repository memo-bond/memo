export abstract class Constants {
  static readonly UNIQUE_USERNAME: string = 'unique_username';

  // db collections
  static readonly SPACES: string = 'spaces';
  static readonly USERS: string = 'users';
}

export abstract class Roles {
  static readonly ADMIN: string = 'admin';
  static readonly MANAGER: string = 'manager';
}