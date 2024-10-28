import {
  registration
} from "./registration.js";
import {Operations} from "./@types.js";


export const operations: Operations = {
  reg: {
    func: registration
  },
}