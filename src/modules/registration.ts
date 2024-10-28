import { User, isUser } from './@types.js';
import { store } from './store.js';

export const registration = (stringData: string) => {
  let errorText = 'Registration data is not valid'
  const user: any = JSON.parse(stringData);
  if(isUser(user)) {
    const users: Array<User> = store.getUsers();
    const userInStorage: User | undefined = users.find(i => i.name === user.name);

    if(userInStorage === undefined) {
      store.regUser(user);
    }

    if(userInStorage !== undefined && (user.name !== userInStorage.name || user.password !== userInStorage.password)) {
      return {
        name: '',
        index: 1,
        error: true,
        errorText: 'Name or password are not valid',
      }
    }
    return {
      name: user.name,
      index: 1,
      error: false,
      errorText,
    }

  }

  return {
    name: '',
    index: 1,
    error: true,
    errorText: 'Registration data is not valid',
  }
}