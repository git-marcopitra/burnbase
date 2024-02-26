import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./auth.utils";
import { getAllData } from "../firestore";
import { TCondition } from "../firestore/firestore.protocol";
import { TLoginWithEmailAndPassword } from "./auth.protocol";

const loginWithEmailAndPassword: TLoginWithEmailAndPassword = async (
  email,
  password,
  options
) => {
  const user = await signInWithEmailAndPassword(auth, email, password).catch(
    () => {
      throw new Error("wrong email or password");
    }
  );

  if (!options || !options.firestoreCollectionName) return user;

  const users = await getAllData(options.firestoreCollectionName)({
    conditions: [["email", "==", email] as TCondition].concat(
      options.firestoreCondition ?? []
    ),
  });

  if (!users.length) throw new Error("User does not exist");

  return user;
};

export default loginWithEmailAndPassword;
