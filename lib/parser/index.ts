import { DFObject } from "..";
import { DataframeReadOptions } from "../../src/@types/df.types";
import { EscapeSeq } from "../../utils";
import { ObjectType } from "./@types/object.types";
import { parseIfNumber } from "./utils";

class Parser {
  private keys: Array<string>;
  private states: Array<string>;
  private object: Array<ObjectType>;

  constructor() {
    this.keys = [];
    this.states = [];
    this.object = [];
  }

  /**
   * This assigns the table header of the file to `this.keys` and
   * return the value as an array of string containing each key. Note:
   * this is case insensitive, ie. it converts the headers to lowercase regardless
   * @param { string } table
   * @returns { Array<string> }
   */
  get_table_header(table: string, options: DataframeReadOptions): Array<string> {
    const header = table.split(EscapeSeq.NEW_LINE, 1)[0].split(options.delimiter);
    if (options.header) this.keys = header.map((header) => header.split(EscapeSeq.CARRIAGE_RETURN)[0].toLocaleLowerCase().trim());
    if (!options.header && options.keys) this.keys = options.keys;
    if (!options.header && !options.keys) throw new Error("Header set to false and no keys provided");
    return this.keys;
  }

  /**
   * @private
   * This function is used to build a JavaScript object of type ObjectType
   * it is used by `this.generate_transition_object` to make the fnuction less verbose
   * @param { string } line
   * @returns { ObjectType }
   */
  private object_builder(line: string, delim: string): ObjectType {
    let state: ObjectType = {};
    line.split(delim).map((value: string, index: number) => {
      state = {
        ...state,
        ...{ [this.keys[index]]: parseIfNumber(value.split(EscapeSeq.CARRIAGE_RETURN)[0].trim()) },
      };
    });
    return state;
  }

  /**
   * This function run through the `.fsm` file and generate an array of
   * JavaScript objects that define the transition for each state when
   * given a certain input
   * @param { string } table
   * @returns {DFObject }
   */
  generate_object(table: string, options: DataframeReadOptions): DFObject {
    const row = table.split(EscapeSeq.NEW_LINE).splice(1);
    this.object = row.map((line: string) => this.object_builder(line, options.delimiter));
    return new DFObject(this.object);
  }
}

export default Parser;
