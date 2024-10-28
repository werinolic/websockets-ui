import { randomUUID } from 'crypto';

import {User, isUser, OperationResponse} from './@types.js';
import { store } from './store.js';

export const registration = (sessionUser: User | null, stringData: string | undefined): Array<OperationResponse> => {
  const response: OperationResponse = {user: sessionUser, users: [], broadcast: false, data: [{
    name: '',
      index: randomUUID(),
      error: true,
      errorText: 'Registration data is not valid',
  }]};

  const data: any = JSON.parse(stringData ? stringData : '');
  if (isUser(data)) {
    const userId = randomUUID();
    const users: Array<User> = store.getUsers();

    const userInStorage: User | undefined = users.find(i => i.name === data.name);
    if (userInStorage === undefined) {
      const user = {...data, index: userId }
      store.regUser(user);
      response.user = user;
      response.users = [{
        name: data.name,
        index: userId,
      }];
      response.data = [{
        name: data.name,
        index: userId,
        error: false,
        errorText: '',
      }]
    }

    if (userInStorage !== undefined && (data.name !== userInStorage.name || data.password !== userInStorage.password)) {
      response.data = [{
        name: '',
        index: userId,
        error: true,
        errorText: 'Name or password are not valid',
      }]
    }
  }

  return [response];
}