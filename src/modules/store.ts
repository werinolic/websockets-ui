import { randomUUID } from 'crypto';

import {Store, User, Room, Game, Ship} from "./@types.js";

const defaultStore:Store = {
  users: [],
  rooms: [],
  games: [],
}

export const store = ((defaultStore) => {
  const store: Store = defaultStore;

  const regUser = (user: User): void => {
    store.users.push(user);
  }
  const getUsers = (): Array<User> => {
    return store.users;
  }

  const getUserByName = (name: string): User | undefined => {
    return store.users.find(i => i.name === name);
  }

  const createRoom = (user: User) => {
    const room: Room ={
      roomId: randomUUID(),
      isAvailable: true,
      roomUsers: [{name: user.name, index: user.index}]
    }
    store.rooms.push(room)
    return room;
  }
  const getRooms = (): Array<Room> => {
    return store.rooms.filter(room => (room.isAvailable));
  }

  const addUserToTheRoom = (user: User, indexRoom: string) => {
    store.rooms = store.rooms.map(room => {
      const isUserAlreadyInTheRoom = !!room.roomUsers.find(i => i.name === user.name)
      if(room.roomId === indexRoom && !isUserAlreadyInTheRoom) {
        return {
          ...room,
          roomUsers: [...room.roomUsers, {name: user.name, index: user.index}]
        }
      }
      return room;
    })
  }

  const removeRoom = (roomId: string) => {
    store.rooms = store.rooms.filter(i => i.roomId !== roomId);
  }

  const createGame = ( room: Room): Game | null => {
    const user1 = getUserByName(room.roomUsers[0].name);
    const user2 = getUserByName(room.roomUsers[1].name);

    if(user1 !== undefined && user2 !== undefined) {
      const game: Game = {
        idGame: randomUUID(),
        players: [{
          idPlayer: randomUUID(),
          user: user1,
          ships: []
        },
        {
          idPlayer: randomUUID(),
          user: user2,
          ships: [],
        }],
      }
      store.games.push(game);
      return game;
    }
    return null;
  }

  const addShips = (user: User, dameId: string, ships: Array<Ship>) => {
    store.games = store.games.map(game => {
      if(game.idGame !== dameId) {
        return game;
      } else {
        const players = game.players.map( player => {
          return player.user.name === user.name ? { ...player, ships} :player;
        })
        return { ...game, players }
      }
    });
  }

  const getActiveUserGame = (user: User): Game | undefined => {
    return store.games.find(game => {
      return (game.players.length === 2 && game.players.find(player => player.user.name === user.name))
    })
  }

  return {
    regUser,
    getUsers,
    createRoom,
    getRooms,
    removeRoom,
    addUserToTheRoom,
    createGame,
    addShips,
    getActiveUserGame,
  }
})(defaultStore)