import { operations } from './modules/operations.js'

const isTypeValid = (type: string) => {
  return type === 'reg'
}

export const router = async (message: {type: string; data: string, id: 0}) => {

  if (isTypeValid(message.type)) {
    console.log("call", message.type)
    const data = operations[message.type].func(message.data)

    return JSON.stringify({
      type: message.type,
      data: JSON.stringify(data),
      id: 0,
    });
  }
}