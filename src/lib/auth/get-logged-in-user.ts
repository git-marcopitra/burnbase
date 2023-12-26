import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firestore/utils";

const getLoggedInUser = (): Promise<User | null> =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => resolve(user || null), reject);
  });

export default getLoggedInUser;
