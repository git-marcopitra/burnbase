import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth.utils";

const getLoggedInUser = (): Promise<User | null> =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => resolve(user || null), reject);
  });

export default getLoggedInUser;
