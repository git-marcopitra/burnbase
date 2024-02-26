import type { User, UserCredential } from "firebase/auth";
import type { TCondition } from "../firestore";

export type TResetPassword = (user: User, newPassword: string) => Promise<void>;

export type TLogout = () => Promise<void>;

export type TLoginWithEmailAndPassword = (
  email: string,
  password: string,
  options?: {
    firestoreCollectionName: string;
    firestoreCondition?: ReadonlyArray<TCondition>;
  }
) => Promise<UserCredential>;

export type TGetLoggedInUser = () => Promise<User | null>;

export type TCreateUser = <T extends unknown>(email: string, password: string, options?: {
  userInfo?: T | undefined;
  hasInstance?: boolean | undefined;
  userCollectionName?: string | undefined;
} | undefined) => Promise<UserCredential>