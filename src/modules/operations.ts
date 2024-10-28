import { Operations, Operation } from "./@types.js";
import { registration } from "./registration.js";
import {addUserToTheRoom, createGame, createRoom, updateRoom} from './room.js'
import {addShips, startGame} from "./game.js";


const updateRoomOperation: Operation = {
  type: 'update_room',
  func: updateRoom,
  triggers: [],
};

export const operations: Operations = {
  reg: {
    type: 'reg',
    func: registration,
    triggers: [],
  },
  create_room: {
    type: 'create_room',
    func: createRoom,
    triggers: [updateRoomOperation],
  },
  add_user_to_room: {
    type: 'add_user_to_room',
    func: addUserToTheRoom,
    triggers: [{
      type: 'create_game',
      func: createGame,
      triggers: [],
    },
    updateRoomOperation],
  },
  add_ships: {
    type: 'add_ships',
    func: addShips,
    triggers: [{
      type: 'start_game',
      func: startGame,
      triggers: [],
    }],
  },
}