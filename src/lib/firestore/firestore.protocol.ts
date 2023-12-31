export type TGenericCollection<T> = Promise<ReadonlyArray<T>>;

import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  limit,
  orderBy,
  OrderByDirection,
  QueryDocumentSnapshot,
  startAfter,
  startAt,
  Unsubscribe,
  UpdateData,
  where,
  WhereFilterOp,
  WithFieldValue,
} from "firebase/firestore";

export type TCondition = [string, WhereFilterOp, unknown];

export interface IOrdinateBy {
  label: string;
  orderDirection?: OrderByDirection;
}
export interface IPagination {
  page?: number;
  limit: number;
  target?: "next" | "previous";
  targetDocument?: QueryDocumentSnapshot<DocumentData>;
  firstItem?: ReadonlyArray<QueryDocumentSnapshot<DocumentData>>;
}
export interface IQueryParams {
  pagination?: IPagination;
  ordinateBy?: ReadonlyArray<IOrdinateBy>;
  conditions?: ReadonlyArray<TCondition>;
}

export type TMapQueryParams = (
  args: IQueryParams
) => ReadonlyArray<
  | ReturnType<typeof where>
  | ReturnType<typeof orderBy>
  | ReturnType<typeof limit>
  | ReturnType<typeof startAt>
  | ReturnType<typeof startAfter>
>;

export type TGetCollection = (
  collectionName: string
) => CollectionReference<DocumentData>;

export type TGetCollectionSize = (
  collectionName: string,
  callback: (number: number) => void,
  queryParams?: IQueryParams
) => Unsubscribe;

export type TGetDocumentReference = (
  collectionName: string,
  docUid: string
) => DocumentReference<DocumentData>;

export type TGetDocument = (
  collectionName: string,
  docUid: string
) => Promise<DocumentData>;

export type TSetDocument<T = unknown> = (
  collectionName: string,
  docUid: string,
  docData: Partial<T>
) => Promise<void>;

export interface IResponse<T> {
  data: T;
  page: number;
  next?: () => Promise<IResponse<T>>;
  previous?: () => Promise<IResponse<T>>;
}

export type TOnSnapshot<T> = (queryParams?: IQueryParams) => Promise<T>;

export type TPageGetter = <T>(
  collectionName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataCallback?: (doc: DocumentData) => Record<string, any>
) => (
  queryParams?: IQueryParams
) => Promise<IResponse<ReadonlyArray<T | unknown>>>;

export type TUpdateDocument = <T = unknown>(
  collectionName: string,
  docUid: string,
  docData: UpdateData<T>
) => Promise<void>;

export type TAddDocument = <T = unknown>(
  collectionName: string,
  docData: WithFieldValue<T>
) => Promise<DocumentReference<unknown>>;

export type TDeleteObject = (urlPhoto: string) => Promise<void>;

export type TGetPathStorage = (url: string) => string;
