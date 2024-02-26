import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth.utils";
import { TGetLoggedInUser } from "./auth.protocol";

const getLoggedInUser: TGetLoggedInUser = () =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => resolve(user || null), reject);
  });

export default getLoggedInUser;
