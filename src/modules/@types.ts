export type Operations = {
  [key in string]: {  func: Function}
}

export interface User {
  name: string;
  password: string;
}

export const isUser = (x: any): x is  User=> {
  return (
    typeof x.name  === 'string' &&
    typeof x.password === 'string'
  );
}

export interface Store {
  users: Array<User>;
}

