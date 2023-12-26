import { User } from "firebase/auth";
declare const getLoggedInUser: () => Promise<User | null>;
export default getLoggedInUser;
