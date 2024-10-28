import {Operation, Message, User,  OperationResponse} from './modules/@types.js';
import { operations } from './modules/operations.js'

export const router = async (sessionUser: User | null, message: {type: string; data: string, id: 0}): Promise<{user: User | null, messages: Array<Message>}> => {
  const operation: Operation = operations[message.type];
  const response: { user: User | null, messages: Array<Message> } = {
    user: sessionUser,
    messages: [],
  }

  if (operation !== undefined) {
    const operations: Array<OperationResponse & {type: string}> = [];
    const operationResult: Array<OperationResponse> = operation.func(sessionUser, message.data);
    operations.push(...operationResult
        .filter(operation => operation.data !== null)
        .map(i => ({...i, type: operation.type}))
    );


    if(operation.triggers.length !== 0) {
      operation.triggers.forEach(trigger => {
        const triggerOperationResult: Array<OperationResponse> = trigger.func(sessionUser);
        operations.push(...triggerOperationResult
            .filter(operation => operation.data !== null)
            .map(i => ({...i, type: trigger.type}))
        );
      })
    }

    response.messages = operations.map((res) => {
      response.user = res.user ? res.user: response.user;
      return {
        type: res.type,
        broadcast: res.broadcast,
        data: JSON.stringify(res.data),
        users: res.users,
        id: 0,
      }});
  }
  return response;
}