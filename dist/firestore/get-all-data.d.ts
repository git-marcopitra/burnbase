import { IQueryParams } from "./firestore.protocol";
declare const getAllData: <T>(collectionName: string) => (queryParams?: IQueryParams) => Promise<readonly T[]>;
export default getAllData;
