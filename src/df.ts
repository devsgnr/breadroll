import { IO, Parser, DFObject } from "../lib";
import { IOSave } from "../lib/io/@types/io.types";
import { Condition } from "../lib/object/@types/filter.types";
import { ObjectType } from "../lib/parser/@types/object.types";
import { DFReadOptions } from "./@types/df.types";

class DF {
  private parser: Parser;
  private io: IO;

  private filepath: string;
  private options: DFReadOptions;

  private keys: Array<string>;
  public object: DFObject;

  constructor(filepath: string, options: DFReadOptions) {
    this.filepath = filepath;
    this.options = options;

    this.keys = [];
    this.object = new DFObject([]);

    this.parser = new Parser();
    this.io = new IO();
  }

  /**
   * This function opens the seperated value file; gets the table headers (if present)
   * and then also generate the object array and returns the array
   * @returns { Promise<Array<ObjectType>> }
   */
  async open(): Promise<DF> {
    return this.io
      .read(this.filepath)
      .then((value) => {
        this.keys = this.parser.get_table_header(value, this.options);
        this.object = this.parser.generate_object(value, this.options);
        return this;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * This function saves the generates finite state DFObj object
   * as a JSON to the specified location and filename
   * @param { string } filepath
   * @returns { Promise<number> }
   */
  save(filepath: string): IOSave {
    return this.io.save(filepath, this.object.aggregate);
  }

  /**
   * This function gets and return all the keys from within the
   * oject
   * @returns { Array<string> }
   */
  get labels(): Array<string> {
    return this.keys;
  }

  /**
   * This function returns the total count of rows in the
   * dataframe
   * @returns { number }
   */
  get count(): number {
    return this.object.count;
  }

  /**
   * This function returns the first five rows of the data frame
   */
  get head(): Array<ObjectType> {
    return this.object.aggregate.splice(0, 5);
  }

  /**
   * This function return all the objects in the array where some
   * properties are eqaul to null
   */
  get isNull(): DFObject {
    return new DFObject(this.object.aggregate.filter((object) => Object.values(object).some((value) => !value)));
  }

  /**
   * This function return all the objects in the array where every object
   * property is not eqaul to `null`
   */
  get notNull(): DFObject {
    return new DFObject(this.object.aggregate.filter((object) => Object.values(object).every((value) => value)));
  }

  /**
   * This function return the data types of each column
   * in the dataframe in a { key: value } pair
   */
  get dtypes(): ObjectType {
    let types: ObjectType = {};
    Object.values(this.object.aggregate[0]).map((value, index) => {
      types = { ...types, ...{ [this.keys[index]]: typeof value } };
    });
    return types;
  }

  /**
   * This function filters the object and return a new array of object based
   * on the filter that was provided as arguments of the function,
   * eg. ("key", "equals", "value")
   * @param { FilterExpression } ...args
   * @returns { DFObject }
   */
  filter(key: string, filter: Condition, value: unknown): DFObject {
    return this.object.filter(key, filter, value);
  }
}

export default DF;
