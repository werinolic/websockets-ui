import { store } from "./store.js";
import { OperationResponse, User, Room } from './@types.js';

export const createRoom = (user: User | null): OperationResponse => {
  if(user !== null) {
    store.createRoom(user);
  }
  return { user, data: [], users: [] }
}

export const updateRoom = (user: User | null): OperationResponse=> {
  const rooms: Array<Room> =  store.getRooms();
  return { user, data: [rooms], users: [] }
}

export const addUserToTheRoom = (user: User | null, dataString: string | undefined): OperationResponse => {
  const data: any = JSON.parse(dataString ? dataString : '');
  if(user !== null && data.indexRoom !== undefined) {
    store.addUserToTheRoom(user, data.indexRoom);
  }
  return { user, data: [], users: [] }
}

export const createGame = (user: User | null): OperationResponse => {
  const rooms = store.getRooms();
  const room = rooms.find(room => {
    return room.roomUsers.length === 2 &&
      room.roomUsers.find(u => u.name === user?.name)
  })
  if(room !== undefined) {
    const game = store.createGame(room);
    const data = game?.players.map(player => ({
      idGame: game?.idGame,
      idPlayer: player.idPlayer,
    }));

    const users = game?.players.map(player => ({
      name: player.user.name,
      index: player.user.index,
    }));
    if(data !== undefined && users !== undefined) {
      store.removeRoom(room.roomId);
      return {user, data, users };
    }
  }

  return { user, data: [], users: [] };
}