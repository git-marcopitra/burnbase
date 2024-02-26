import { signOut } from "firebase/auth";
import { auth } from "./auth.utils";
import { TLogout } from "./auth.protocol";

const logout: TLogout = () => signOut(auth);

export default logout;
