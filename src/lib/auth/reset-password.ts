import { updatePassword } from "firebase/auth";
import type { TResetPassword } from "./auth.protocol";

const resetPassword: TResetPassword = (user, newPassword) =>
  updatePassword(user, newPassword);

export default resetPassword;
