import { localStorageEffect } from "services/utils";
import {
    atom,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
import { User } from "../models/user";

export const AuthUser = atom({
    key: "authUser",
    default: {} as User,
    effects_UNSTABLE: [localStorageEffect("authUser")],
});

