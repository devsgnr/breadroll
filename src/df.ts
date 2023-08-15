import { IO, Parser, DFObject } from "../lib";
import { IOSave } from "../lib/io/@types/io.types";
import { ObjectType } from "../lib/parser/@types/object.types";
import { DFReadOptions } from "./@types/df.types";

class DF {
  private parser: Parser;
  private io: IO;
  private object_handler: DFObject;

  private filepath: string;
  private options: DFReadOptions;

  private keys: Array<string>;
  public object: Array<ObjectType>;

  constructor(filepath: string, options: DFReadOptions) {
    this.parser = new Parser();
    this.io = new IO();
    this.object_handler = new DFObject();

    this.filepath = filepath;
    this.options = options;

    this.keys = [];
    this.object = [];
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
        if (this.options.header) this.keys = this.parser.get_table_header(value, this.options.delimiter);
        this.object = this.parser.generate_object(value, this.options.delimiter);
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
    return this.io.save(filepath, this.object);
  }

  /**
   * This function gets and return all the keys from within the
   * oject
   * @returns { Array<string> }
   */
  get getKeys(): Array<string> {
    if (this.keys) return this.keys;
    else throw new Error("No header present");
  }

  /**
   * This function get the number of occurences of a particular key's
   * value and returns the count
   * @param {string} key
   * @param {unknown} value
   * @returns {number}
   */
  getCount(key: string, value: unknown): number {
    return this.object_handler.count(this.object, key, value);
  }

  /**
   * This function returns the first five rows of the data frame
   */
  get head() {
    return this.object.splice(0, 5);
  }

  /**
   * This function filters the object and return a new array of object based
   * on the filter that was provided as arguments of the function,
   * eg. ("key", "equals", "value")
   */
  filter(): Array<ObjectType> {
    return [];
  }
}

export default DF;
