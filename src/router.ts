import {Operation, Message, User,  OperationResponse} from './modules/@types.js';
import { operations } from './modules/operations.js'

export const router = async (sessionUser: User | null, message: {type: string; data: string, id: 0}): Promise<{user: User | null, messages: Array<Message>}> => {
  const operation: Operation = operations[message.type];
  const response: { user: User | null, messages: Array<Message> } = {
    user: sessionUser,
    messages: [],
  }

  if (operation !== undefined) {
    const { user, data, users }:  OperationResponse = operation.func(sessionUser, message.data)
    response.user = user

    if(operation.triggers.length !== 0) {
      operation.triggers.forEach(trigger => {
        const { data, users}:  OperationResponse = trigger.func(sessionUser);
        if (trigger.response) {
          const newMessages: Array<Message> = data.map(i => ({
            type: trigger.type,
            broadcast: trigger.broadcast,
            data: JSON.stringify(i),
            users: users,
            id: 0,
          }));
          response.messages = [...response.messages, ...newMessages]
        }
      })
    }
    if(operation.response) {
      const newMessages: Array<Message> = data.map(i => ({
        type: message.type,
        broadcast: operation.broadcast,
        data: JSON.stringify(i),
        users: users,
        id: 0,
      }));
      response.messages = [...newMessages, ...response.messages]
    }
  }
  return response;
}