import { signOut } from "firebase/auth";
import { auth } from "./auth.utils";

const logout = (): Promise<void> => signOut(auth);

export default logout;