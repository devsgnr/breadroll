import { IO, Parser, SVObject } from "../lib";
import { IOSave } from "../lib/io/@types/io.types";
import { DelimterType } from "../lib/parser";
import { ObjectType } from "../lib/parser/@types/object.types";
import { SVReadOptions } from "./@types/sv.types";

class SV {
  private parser: Parser;
  private io: IO;
  private svObj: SVObject;

  private keys: Array<string>;
  public object: Array<ObjectType>;

  constructor() {
    this.parser = new Parser();
    this.io = new IO();
    this.svObj = new SVObject();

    this.keys = [];
    this.object = [];
  }

  /**
   * This function opens the .fsm file; get the table headers and then
   * also generated the svObj object array and returns the array
   * @param { string } filepath
   * @returns { Promise<Array<ObjectType>> }
   */
  async read(filepath: string, delim: DelimterType, option: SVReadOptions = { header: true }): Promise<SV> {
    return this.io
      .read(filepath)
      .then((value) => {
        if (option.header) this.keys = this.parser.get_table_header(value, delim);
        this.object = this.parser.generate_object(value);
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
}

export default SV;
