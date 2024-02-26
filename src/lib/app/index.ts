import { getApp, getApps, initializeApp } from "firebase/app";
import type { TInit } from "./app.protocol";

export const init: TInit = (args) =>
  getApps().length ? getApp("burnbase") : initializeApp(args, "burnbase");

export type * from "./app.protocol";
