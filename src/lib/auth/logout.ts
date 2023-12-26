import { signOut } from "firebase/auth";
import { auth } from "../firestore/utils";

const logout = (): Promise<void> => signOut(auth);

export default logout;