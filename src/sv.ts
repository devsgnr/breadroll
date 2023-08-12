import { IO, Parser } from "../lib";
import { IOSave } from "../lib/io/@types/io.types";
import { ObjectType } from "../lib/parser/@types/object.types";
import { SVReadOptions } from "./@types/sv.types";

class SV {
  private parser: Parser;
  private io: IO;

  private filepath: string;
  private delimiter: string;
  private options: SVReadOptions;

  private keys: Array<string>;
  public object: Array<ObjectType>;

  constructor(filepath: string, delimiter: string, options: SVReadOptions) {
    this.parser = new Parser();
    this.io = new IO();

    this.filepath = filepath;
    this.delimiter = delimiter;
    this.options = options;

    this.keys = [];
    this.object = [];
  }

  /**
   * This function opens the seperated value file; gets the table headers (if present)
   * and then also generate the object array and returns the array
   * @returns { Promise<Array<ObjectType>> }
   */
  async read(): Promise<SV> {
    return this.io
      .read(this.filepath)
      .then((value) => {
        if (this.options.header) this.keys = this.parser.get_table_header(value, this.delimiter);
        this.object = this.parser.generate_object(value, this.delimiter);
        return this;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * This function saves the generates finite state svObj object
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
   * This function filters the object and return a new array of object based
   * on the filter that was provided as arguments of the function,
   * eg. ("key", "equals", "value")
   */
  filter(): Array<ObjectType> {
    return [];
  }
}

export default SV;
