import { UserCredential } from "firebase/auth";
declare const createUser: <T extends unknown>(email: string, password: string, options?: {
    userInfo?: T | undefined;
    hasInstance?: boolean | undefined;
    userCollectionName?: string | undefined;
} | undefined) => Promise<UserCredential>;
export default createUser;
