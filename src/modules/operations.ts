import {
  registration
} from "./registration.js";


export const operations: {[key in string ]: {
  func: Function
  }} = {
  reg: {
    func: registration
  },
}