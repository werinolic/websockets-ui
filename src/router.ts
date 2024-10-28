import { operations } from './modules/operations.js'

export const router = async (message: {type: string; data: string, id: 0}): Promise<string> => {
  console.log("call", message.type)
  if (operations[message.type] !== undefined) {
    const data = operations[message.type].func(message.data)
    return JSON.stringify({
      type: message.type,
      data: JSON.stringify(data),
      id: 0,
    });
  } else {
    return ''
  }
}