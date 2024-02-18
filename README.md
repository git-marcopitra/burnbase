# BURNBASE

Burnbase is a firebase (module-based) wrapper, to handle the functions in an easier way, with a lot of utils as lib plus

**OBS:** _We are in the alpha version, so something can break, we'll release the first Beta version, once we have everything well tested._

## How to install

You can install the package on your js-based project with:

### pnpm

```bash
pnpm add burnbase@alpha # yarn-like
# or
pnpm install burnbase@alpha # npm-like
```

### yarn

```bash
yarn add burnbase@alpha
```

### npm

```bash
npm add burnbase@alpha
```

## How to use

### Init

In your burnbase folder (api | service | ...), you must create a file with the init scripts exposed on `burnbase/app`:

`/src/api/init.ts`

```ts
import { init } from "burnbase/app";

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

init(firebaseConfig);
```

Note that, `firebaseConfig` constant has the same format of firebase one, so all properties are optional according with what you need to config, or you will use.

And then you have the **burnbase** `init` function, that wraps all firebase app creation flow.

Knowing that, you ready to import this code on your main file, warranting that you always has the app in all the code.

`/src/main.ts`

```ts
import '../api/init';

...
```

Now, you are able to use any burnbase and firebase function in your code.

### Auth

For Firebase Auth, we have the following functions on `burnbase/auth`:

- `getLoggedInUser`;
- `loginWithEmailAndPassword`;
- `resetPassword`;
- `createUser`;
- `logout`.

#### `getLoggedInUser`

This function returns the `currentUser` as Firebase **User**.

`src/util.ts`

```ts
import { getLoggedInUser } from 'burnbase/auth';

export const getCurrentUser = async () => {
  const currentUser = await getLoggedInUser();

  ...

  return currentUser;
};
```

#### `loginWithEmailAndPassword`

This function returns the `userCredentialInfo` as Firebase **UserCredential**, expecting 2-3 params.

##### Basic Usage (`loginWithEmailAndPassword`)

Passing only the email and password, you can login with an existing account on Firebase auth.

`src/login.ts`

```ts
import { loginWithEmailAndPassword } from 'burnbase/auth';

export const login = async (email: string, password: string) => {
  const user = await loginWithEmailAndPassword(user, password);

  ...

  return user;
};
```

##### Advanced Usage (`loginWithEmailAndPassword`)

Passing options after passing the email and password, you can login with an existing account on Firebase auth, and verify if this account exists on `firestoreCollectionName` in options, and if you want you can add many more conditions to the `firestoreCondition` list.

`src/login.ts`

```ts
import { loginWithEmailAndPassword } from 'burnbase/auth';

export const login = async (email: string, password: string) => {
  const user = await loginWithEmailAndPassword(
    user,
    password,
    {
      firestoreCollectionName: 'userCollection' // it will verify if the email exists on this collection, on prop email
    }
  );

  ...

  return user;
};
```

```ts
import { loginWithEmailAndPassword } from "burnbase/auth";

const login = async (email: string, password: string) => {
  const user = await loginWithEmailAndPassword(user, password, {
    firestoreCollectionName: "userCollection",
    firestoreCondition: [
      ["role", "==", "admin"], // it will verify if the property role is equal to "admin"
      ["status", ">", 0], // it will verify if the property status is greater than 0 (in my case, means active).
    ],
  });

  return user;
};
```

#### `resetPassword`

This function will update the password in your Firebase Auth, expecting an Firebase **User** and a new `string` password

`src/renew-password.ts`

```ts
import { resetPassword } from "burnbase/auth";
import type { User } from "firebase/auth";

const renewPassword = async (user: User, newPassword) => {
  await resetPassword(user, newPassword);
};
```

#### `logout`

This function will kill the current user session.

`src/logout.ts`

```ts
import { logout } from "burnbase/auth";

const logoff = async () => {
  await logout();
};
```

### Firestore

For Firebase Firestore, we have the following functions on `burnbase/firestore`:

- `getAllData`;
- `getPagination`;
- `getCollection`;
- `getCollectionRef`;
- `getDocument`;
- `setDocument`;
- `updateDocument`;
- `addDocument`;
- `deleteFile`;
- `getCollectionSize`;
- `mapQueryParams`.

#### `getAllData`

This function expect a collection name and then a query if needed, it will return all the data on the collection.

##### Basic Usage (`getAllData`)

`src/get-users.ts`

```ts
import { getAllData } from "burnbase/firestore";

const getUsers = async () => {
  await getAllData("users")();
};
```

##### Advanced Usage (`getAllData`)

`src/get-admins-sorted.ts`

```ts
import { getAllData } from "burnbase/firestore";

const getAdminsSorted = async () => {
  await getAllData("users")({
    conditions: [["role", "==", "admin"]],
    ordinateBy: [{ label: "name", orderDirection: "asc" }],
  });
};
```

`src/get-strict-admin-list.ts`

```ts
import { getAllData } from "burnbase/firestore";

const getStrictAdminList = async () => {
  await getAllData("users")({
    pagination: { limit: 5, page: 1 },
    conditions: [["role", "==", "admin"]],
    ordinateBy: [{ label: "name", orderDirection: "asc" }],
  });
};
```

###### `pagination`

Pagination is an optional object and `undefined` by default, and there is some utils attributes:

| Attribute | Structure |
| :-------- | --------: |
| `limit`   | `number` - the limit of the data that you need. |
| `page`    | `number` (optional) - the exact page that you are looking for. |
| `target`  | `"next"` or `"previous"` (optional) - asks for next or previous page, based on current page. |
| `targetDocument`* | `QueryDocumentSnapshot<DocumentData>` (optional) - the target document that you must have in the list. |
| `firstItem`* | `ReadonlyArray<QueryDocumentSnapshot<DocumentData>>` (option) -  a list of all pages first items elements. |

***Note:*** * *means that the attribute is mostly for internal use, but is ok if you find a nice tricky to use it by your own, or maybe improve the code xD.*

###### `conditions`

Conditions is an optional list and `undefined` by default, and it's structure is basically based on an array with 3 position:

`[<field-name>, <operator>, <value>]`

Where:

- `<field-name>`: is a `string` that represents the attribute on document;
- `<operator>`: is a `WhereFilterOp` that represents the operation properly;
- `<value>`: is an `unknown` value, that represents the matching value that you want.

Ex.1: Checking if the role is equal to `admin`.
 `['role', '==', 'admin']`

Ex.2: Checking if the position represents the podium, that can be 1, 2 oe 3.
 `['position', 'in', [1, 2, 3]]`

And then after you understand how conditions works, you can combine them into a list of conditions.
