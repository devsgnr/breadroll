import { ObjectType } from "../parser/@types/object.types";

class DFObject {
  public keys: Array<string>;

  constructor() {
    this.keys = [];
  }

  /**
   * This function retuns the count of occurance of a dataframe's key's
   * value
   * @param {Array<ObjectType>} dataframe
   * @param {string} key
   * @param {unknown} value
   * @returns {number}
   */
  count(dataframe: Array<ObjectType>, key: string, value: unknown): number {
    return dataframe.filter((object) => object[key] === value).length;
  }
}

export default DFObject;
