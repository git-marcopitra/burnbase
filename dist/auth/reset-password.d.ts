import { User } from "firebase/auth";
declare const resetPassword: (user: User, newPassword: string) => Promise<void>;
export default resetPassword;
