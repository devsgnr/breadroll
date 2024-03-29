import IO from "../io";
import { IOSave, Condition, FilterType, Indexer, Apply } from "../types";
import Filters from "./filters";

class Dataframe {
  private object: Array<Record<string, unknown>>;
  private filters: FilterType;
  private io: IO;

  constructor(object: Array<Record<string, unknown>>) {
    this.object = object;
    this.filters = Object({ ...Filters });
    this.io = new IO();
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
  get head(): Dataframe {
    return new Dataframe(this.object.splice(0, 5));
  }

  /**
   * This function return all the objects in the array where some
   * properties are eqaul to null
   */
  get isNull(): Dataframe {
    return new Dataframe(this.object.filter((object) => Object.values(object).some((value) => !value)));
  }

  /**
   * This function return all the objects in the array where every object
   * property is not eqaul to `null`
   */
  get notNull(): Dataframe {
    return new Dataframe(this.object.filter((object) => Object.values(object).every((value) => value)));
  }

  /**
   * This function return the data types of each column
   * in the dataframe in a { key: value } pair
   */
  get dtypes(): Record<string, unknown> {
    let types: Record<string, unknown> = {};
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
   * @param { unknown } limit optional
   * @returns { Dataframe }
   */
  filter(key: string, filter: Condition, value: unknown, limit?: unknown): Dataframe {
    return this.filters[filter](this.object, key, value, limit);
  }

  /**
   * This function returns the only the desired rows in the Dataframe
   * ie. the rows with the specified keys
   * @param { Array<string> } keys
   * @returns { Dataframe }
   */
  select(keys: Array<string>): Dataframe {
    return new Dataframe(
      this.object.map((obj: Record<string, unknown>) => {
        return keys.reduce((acc: Record<string, unknown>, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
      }),
    );
  }

  /**
   * This function returns columns strictly using interger based indexing
   * similar to panda's `iloc`, this function takes an object with either the start or the end
   * index and return the columns
   * @param { Indexer } args
   * @returns { Dataframe }
   */
  cols(args: Indexer): Dataframe {
    const start: number = args.start ? args.start : 0;
    const end: number = args.end ? args.end : this.object.length;

    const keys = (): Array<string> => {
      if (!args.start && args.end && args.end < 0) return this.labels.slice(args.end);
      else return this.labels.splice(start, end);
    };

    return new Dataframe(
      this.object.map((obj: Record<string, unknown>) => {
        return keys().reduce((acc: Record<string, unknown>, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
      }),
    );
  }

  /**
   * This function returns rows using interger based indexing,
   * this function takes an object with either the start or the end
   * index and return the rows
   * @param { Indexer } args
   * @returns { Dataframe }
   */
  rows(args: Indexer): Dataframe {
    const start: number = args.start ? args.start : 0;
    const end: number = args.end ? args.end : this.object.length;

    return new Dataframe(this.object.splice(start, end));
  }

  /**
   * This function applies an operation to values of the rows
   * of a specified column of the dataframe
   * @param { Apply } Apply
   * @returns { Dataframe }
   */
  apply({ key, fn, inplace = false, newkey }: Apply): Dataframe {
    return new Dataframe(
      this.object.map((value) => {
        if (!inplace && !newkey) return { ...value, ...{ [`${key}_1`]: fn(value[key]) } };
        if (!inplace && newkey) return { ...value, ...{ [newkey]: fn(value[key]) } };
        return { ...value, ...{ [key]: fn(value[key]) } };
      }),
    );
  }

  /**
   * This function exposes the array of objects before or after
   * filter has been applied to it
   * @returns { Array<Record<string, unknown>> }
   */
  get value(): Array<Record<string, unknown>> {
    return this.object;
  }

  /**
   * This function returns the sum of all the values of the
   * specified column ie. key. Note, the values are coerse into
   * a number type.
   * @param { string } key
   * @returns { number }
   */
  sum(key: string): number {
    return this.object.reduce((acc, curr) => acc + <number>curr[key], 0);
  }

  /**
   * This function returns the average of all the values of the
   * specified column ie. key. Note, the values are coerse into
   * a number type.
   * @param { string } key
   * @returns { number }
   */
  average(key: string): number {
    return this.object.reduce((acc, curr) => acc + <number>curr[key], 0) / this.object.length;
  }

  /**
   * This function returns the maximum value of all the values of the
   * specified column ie. key. Note, the values are coerse into
   * a number type.
   * @param { string } key
   * @returns { number }
   */
  max(key: string): number {
    const arr = this.object.map((obj) => obj[key]) as Array<number>;
    return Math.max(...arr);
  }

  /**
   * This function returns the minimum value of all the values of the
   * specified column ie. key. Note, the values are coerse into
   * a number type.
   * @param { string } key
   * @returns { number }
   */
  min(key: string): number {
    const arr = this.object.map((obj) => obj[key]) as Array<number>;
    return Math.min(...arr);
  }

  /**
   * This  function `use` provides a callback function that provides
   * the value of `Dataframe.value` which can then be used to perform
   * any custom operation you'd like on the values of the `Dataframe`
   * @param { function } callback
   * @returns { Dataframe }
   */
  use(callback: (object: Array<Record<string, unknown>>) => Dataframe): Dataframe {
    return callback(this.object);
  }

  /**
   * This function makes use of the IO class to save a variation of
   * different types of files
   * @param location
   * @returns { IOSave }
   */
  get save(): IOSave {
    return this.io.save(this.object);
  }

  /**
   * This function converts the current dataframe into a blob
   * of the select file types "csv | tsv", and returns the blob
   * object
   * @param { string } filetype
   * @returns { Blob }
   */
  toBlob(filetype: "csv" | "tsv"): Blob {
    return this.io.toBlob(this.object, filetype);
  }
}

export default Dataframe;
