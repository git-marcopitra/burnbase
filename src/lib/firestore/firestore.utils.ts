import {
  getFirestore,
  limit,
  orderBy,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";

import { app } from "../app/app.utils";
import type { TMapQueryParams } from "./firestore.protocol";

export const firestore = getFirestore(app);

export const mapQueryParams: TMapQueryParams = ({
  conditions,
  ordinateBy,
  pagination,
}) => {
  const query = [];

  conditions?.forEach((condition) =>
    query.push(where(condition[0], condition[1], condition[2]))
  );

  ordinateBy?.forEach(({ label, orderDirection }) =>
    query.push(orderBy(label, orderDirection))
  );

  if (pagination) {
    query.push(limit(pagination.limit));
    if (pagination.targetDocument)
      query.push(
        pagination.target === "next"
          ? startAfter(pagination.targetDocument)
          : startAt(pagination.targetDocument)
      );
  }

  return query;
};
