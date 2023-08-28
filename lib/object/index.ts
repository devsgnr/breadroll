import { DFCustomType } from "../../src/@types/df.types";
import { ObjectType } from "../parser/@types/object.types";
import { Condition, FilterType } from "./@types/filter.types";
import Filters from "./filters";

class DFObject {
  private object: Array<ObjectType>;
  private filters: FilterType;

  constructor(object: Array<ObjectType>) {
    this.object = object;
    this.filters = Object({ ...Filters });
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
   * This function gets and return all the keys from within the
   * oject
   * @returns { Array<string> }
   */
  get labels(): Array<string> {
    return Object.keys(this.object[0]);
  }

  /**
   * This function returns the first five rows of the data frame
   */
  get head(): DFObject {
    return new DFObject(this.object.splice(0, 5));
  }

  /**
   * This function return all the objects in the array where some
   * properties are eqaul to null
   */
  get isNull(): DFObject {
    return new DFObject(this.object.filter((object) => Object.values(object).some((value) => !value)));
  }

  /**
   * This function return all the objects in the array where every object
   * property is not eqaul to `null`
   */
  get notNull(): DFObject {
    return new DFObject(this.object.filter((object) => Object.values(object).every((value) => value)));
  }

  /**
   * This function return the data types of each column
   * in the dataframe in a { key: value } pair
   */
  get dtypes(): ObjectType {
    let types: ObjectType = {};
    Object.values(this.object[0]).map((value, index) => {
      types = { ...types, ...{ [Object.keys(this.object[0])[index]]: typeof value } };
    });
    return types;
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
  filter(key: string, filter: Condition, value: unknown, limit?: unknown): DFObject {
    return this.filters[filter](this.object, key, value, limit);
  }

  /**
   * extend
   */
  custom: DFCustomType = {
    operation: (callback: (object: Array<ObjectType>) => DFObject) => {
      return callback(this.object);
    },
  };

  /**
   * This function exposes the array of objects before or after
   * filter has been applied to it
   * @returns { Array<ObjectType> }
   */
  get value(): Array<ObjectType> {
    return this.object;
  }
}

export default DFObject;
