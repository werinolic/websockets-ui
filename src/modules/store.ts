import {Store, User} from "./@types.js";

const defaultStore:Store = {
  users: [],
}

export const store = ((defaultStore) => {
  const store: Store = defaultStore;

  const regUser = (user: User): void => {
    store.users.push(user);
  }
  const getUsers = (): Array<User> => {
    return store.users;
  }

  return {
    regUser,
    getUsers,
  }
})(defaultStore)