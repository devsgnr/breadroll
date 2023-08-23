import { ObjectType } from "../parser/@types/object.types";
import { Condition, FilterObject } from "./@types/filter.types";

class DFObject {
  private object: Array<ObjectType>;

  constructor(object: Array<ObjectType>) {
    this.object = object;
  }

  /**
   * This function retuns the count of occurance of a dataframe's key's
   * value
   * @returns {number}
   */
  get count(): number {
    return this.object.length;
  }

  /**
   * This function filters out this.object according to the key and
   * value passed as arguments, the filter condition eg. "equals" specifies the
   * type of filter operation
   * @param { string } key
   * @param { Condition } filter
   * @param { unknown } value
   * @returns { DFObject }
   */
  filter(key: string, filter: Condition, value: unknown): DFObject {
    return FilterObject[filter](this.object, ...[key, value]);
  }

  /**
   * This function exposes the array of objects before or after
   * filter has been applied to it
   * @returns { ObjectType[] }
   */
  get aggregate(): ObjectType[] {
    return this.object;
  }
}

export default DFObject;
