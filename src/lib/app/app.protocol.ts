import type { FirebaseApp } from "firebase/app";

export interface IInitArgs {
  appId: string;
  apiKey: string;
  projectId: string;
  authDomain?: string;
  measurementId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
}

export type TInit = (args: IInitArgs) => FirebaseApp;
