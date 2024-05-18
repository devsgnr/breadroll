import Dataframe from "../object";
import { DataframeReadOptions } from "../types";
import { EscapeSeq } from "../types";
import { parse } from "./utils";

const { NEW_LINE, CARRIAGE_RETURN } = EscapeSeq;

class Parser {
  private keys: Array<string>;
  private states: Array<string>;
  private object: Array<Record<string, unknown>>;

  constructor() {
    this.keys = [];
    this.states = [];
    this.object = [];
  }

  /**
   * This assigns the table header of the file to `this.keys` and
   * return the value as an array of string containing each key. Note:
   * this is case sensitive
   * @param { string } table
   * @returns { Array<string> }
   */
  get_table_header(table: string, sep: string, options: DataframeReadOptions): Array<string> {
    const header = table.split(NEW_LINE, 1)[0].split(sep);
    if (options.header) this.keys = header.map((header) => header.split(CARRIAGE_RETURN)[0].trim());
    if (!options.header && options.keys) this.keys = options.keys;
    if (!options.header && !options.keys) throw new Error("Header set to false and no keys provided");
    return this.keys;
  }

  /**
   * @private
   * This function is used to build a JavaScript object of type Record<string, unknown>
   * it is used by `this.generate_object` to make the function less verbose
   * @param { string } line
   * @returns { Record<string, unknown> }
   */
  private object_builder(line: string, delim: string, option: DataframeReadOptions): Record<string, unknown> {
    let state: Record<string, unknown> = {};
    line.split(delim).map((value: string, index: number) => {
      state = {
        ...state,
        ...{ [this.keys[index]]: parse(value.split(CARRIAGE_RETURN)[0].trim(), option) },
      };
    });
    return state;
  }

  /**
   * This function run through the file and generate an array of
   * JavaScript objects
   * @param { string } table
   * @returns { Dataframe }
   */
  generate_object<T extends Record<string, unknown>>(table: string, sep: string, options: DataframeReadOptions): Dataframe<T> {
    const row = table.split(NEW_LINE).splice(1);
    this.object = row.map((line: string) => this.object_builder(line, sep, options));
    return new Dataframe<T>(this.object as T[]);
  }
}

export default Parser;
