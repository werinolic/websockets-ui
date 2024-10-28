export interface Message {
  type: string;
  data: string;
  broadcast: boolean;
  users: Array<User>;
  id: 0;
}

export interface Operation {
  type: string;
  func: (user: User | null, stringData?: string) => OperationResponse;
  response: boolean;
  broadcast: boolean;
  triggers: Array<Operation>;
}

export interface OperationResponse {
  user: User | null,
  data: Array<object>,
  users: Array<User>;
}

export type Operations = {
  [key in string]: Operation
}

export interface User {
  name: string;
  password?: string;
  index: string;
}

export const isUser = (x: any): x is  User => {
  return (
    typeof x.name  === 'string' &&
    typeof x.password === 'string'
  );
}

export interface Room {
  roomId: string;
  isAvailable: boolean;
  roomUsers: Array<{
    name: string,
    index: number | string,
  }>
}

export interface Ship {
  position: {
    x: number,
    y: number,
  },
  direction: boolean,
  length: number,
  type: "small"|"medium"|"large"|"huge",
}

export interface Player {
  idPlayer: string;
  user: User;
  ships: Array<Ship>
}

export interface Game {
  idGame: string;
  players: Array<Player>;

}

export interface Store {
  users: Array<User>;
  rooms: Array<Room>;
  games: Array<Game>;
}

