import { TCondition } from "../firestore/firestore.protocol";
declare const loginWithEmailAndPassword: (email: string, password: string, options?: {
    firestoreCollectionName: string;
    firestoreCondition?: ReadonlyArray<TCondition>;
}) => Promise<import("firebase/auth").UserCredential>;
export default loginWithEmailAndPassword;
