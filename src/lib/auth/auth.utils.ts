import { getAuth } from "firebase/auth";
import { app } from "../app/app.utils";

export const auth = getAuth(app);