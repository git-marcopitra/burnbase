import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { IInitArgs } from "./types";

export const init = (args: IInitArgs): FirebaseApp =>
  getApp("burnbase") ?? initializeApp(args, "burnbase");
