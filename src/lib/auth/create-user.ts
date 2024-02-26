import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { setDocument } from "../firestore";
import { initializeApp } from "firebase/app";

import { auth } from "./auth.utils";
import { app } from "../app/app.utils";
import { TCreateUser } from "./auth.protocol";

const createUser: TCreateUser = async (email, password, options) => {
  if (!options) return createUserWithEmailAndPassword(auth, email, password);

  if (!options.hasInstance)
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (user: UserCredential) => {
        if (!options.userCollectionName) return user;

        await setDocument(options.userCollectionName, user.user.uid, {
          email,
          ...(options.userInfo ?? {}),
        });

        return user;
      }
    );

  const temporaryAuth = getAuth(initializeApp(app.options, "temporary"));

  return createUserWithEmailAndPassword(temporaryAuth, email, password)
    .then(async (user: UserCredential) => {
      if (!options.userCollectionName) return user;

      await setDocument(options.userCollectionName, user.user.uid, {
        email,
        ...(options.userInfo ?? {}),
      });

      return user;
    })
    .finally(() => signOut(temporaryAuth));
};

export default createUser;
