import { v4 as uuidv4 } from 'uuid';

import {User, isUser, OperationResponse} from './@types.js';
import { store } from './store.js';

export const registration = (sessionUser: User | null, stringData: string | undefined): OperationResponse => {
  const response: OperationResponse = {user: sessionUser, users: [], data: [{
    name: '',
      index: uuidv4(),
      error: true,
      errorText: 'Registration data is not valid',
  }]};

  const data: any = JSON.parse(stringData ? stringData : '');
  if (isUser(data)) {
    const users: Array<User> = store.getUsers();
    const userInStorage: User | undefined = users.find(i => i.name === data.name);

    if (userInStorage === undefined) {
      store.regUser(data);
      response.user = data;
      response.users = [{
        name: data.name,
        index: data.index,
      }];
      response.data = [{
        name: data.name,
        index: uuidv4(),
        error: false,
        errorText: '',
      }]
    }

    if (userInStorage !== undefined && (data.name !== userInStorage.name || data.password !== userInStorage.password)) {
      response.data = [{
        name: '',
        index: uuidv4(),
        error: true,
        errorText: 'Name or password are not valid',
      }]
    }
  }

  return response;
}