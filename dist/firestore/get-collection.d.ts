import { IQueryParams, TGenericCollection } from "./firestore.protocol";
declare const getGenericCollection: <T>(collectionName: string, queryParams?: IQueryParams) => TGenericCollection<T>;
export default getGenericCollection;
