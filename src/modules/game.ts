import {OperationResponse, User} from "./@types.js";
import { store } from './store.js';

export const addShips = (user: User | null, stringData: string | undefined ): Array<OperationResponse> => {
  if(stringData !== undefined) {
    const data = JSON.parse(stringData);
    if (user !== null && data !== undefined && data.ships) {
      store.addShips(user, data.ships)
    }
  }

  return [{ user, data: null, users: [], broadcast: false }]
}

export const startGame =  (user: User | null): Array<OperationResponse> => {
  if(user !== null) {
    const game = store.getActiveUserGame(user);

    if(game !== undefined && game.players.every(p => p.ships.length !== 0)) {
      return game.players.map(player => {
        const user = player.user;
        return {
          user,
          users: [user],
          broadcast: false,
          data: [{
            ships: player.ships,
            currentPlayerIndex: player.idPlayer
          }]
        }
      });
    }
  }
  return [{ user, data: null, users: [], broadcast: false }]
}