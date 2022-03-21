import * as admin from 'firebase-admin';
import { CONSTANTS } from "./constants";
import { BaseEntity } from "./entities/BaseEntity";
import { GroupEntity } from './entities/Group';
import { SpaceEntity } from './entities/Space';

let database: admin.firestore.Firestore | null = null;
let UserRepository;
let SpaceRepository;
let MemoRepository;
let Repository: { Group: any; Space: any };

const initDB = () => {
  database = admin.firestore();
  // Repository
  UserRepository = admin.firestore().collection(CONSTANTS.USERS);
  SpaceRepository = admin.firestore().collection(CONSTANTS.SPACES);
  MemoRepository = admin.firestore().collection(CONSTANTS.MEMOS);

  database.settings({ ignoreUndefinedProperties: true })
  const converter = <T extends BaseEntity>() => ({
    toFirestore: (data: Partial<T>) => data,
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
      const entity = snap.data() as T;
      entity.id = snap.id;
      return entity;
    }
  })
  const dataPoint = <T>(collectionPath: string) => {
    if (database) {
      database.collection(collectionPath).withConverter(converter<T>())
    }
  };

  Repository = {
    // list your collections here
    Group: dataPoint<GroupEntity>(CONSTANTS.GROUPS),
    Space: dataPoint<SpaceEntity>(CONSTANTS.SPACES),
  }
}

initDB();

export {
  database,
  UserRepository,
  SpaceRepository,
  MemoRepository,
  Repository
}
