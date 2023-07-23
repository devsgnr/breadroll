import { ObjectType } from "../parser/@types/object.types";

class SVObject {
  public keys: Array<string>;

  constructor() {
    this.keys = [];
  }

  /**
   * This function returns all the keys within the object
   * in a list (array) of string
   * @param { Array<ObjectType> } table
   * @returns { Array<string> }
   */
  getAllKeys(table: Array<ObjectType>): Array<string> {
    this.keys = table.map((state: ObjectType) => state.state);
    return this.keys;
  }
}

export default SVObject;
