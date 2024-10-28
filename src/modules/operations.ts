import { Operations, Operation } from "./@types.js";
import { registration } from "./registration.js";
import {addUserToTheRoom, createGame, createRoom, updateRoom} from './room.js'
import {addShips} from "./game";


const updateRoomOperation: Operation = {
  type: 'update_room',
  func: updateRoom,
  response: true,
  triggers: [],
  broadcast: true,
};

export const operations: Operations = {
  reg: {
    type: 'reg',
    func: registration,
    response: true,
    broadcast: false,
    triggers: [updateRoomOperation],
  },
  create_room: {
    type: 'create_room',
    func: createRoom,
    response: false,
    broadcast: false,
    triggers: [updateRoomOperation],
  },
  add_user_to_room: {
    type: 'add_user_to_room',
    func: addUserToTheRoom,
    response: false,
    broadcast: false,
    triggers: [{
      type: 'create_game',
      func: createGame,
      response: true,
      broadcast: false,
      triggers: [],
    },
    updateRoomOperation],
  },
  add_ships: {
    type: 'add_ships',
    func: addShips,
    response: false,
    broadcast: false,
    triggers: [],
  },
}