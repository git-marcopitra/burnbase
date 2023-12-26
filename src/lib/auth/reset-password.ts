import { User, updatePassword } from "firebase/auth";

const resetPassword = (user: User, newPassword: string) =>
  updatePassword(user, newPassword);

export default resetPassword;
