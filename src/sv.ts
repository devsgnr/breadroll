import { IO, Parser, SVObject } from "../lib";
import { IOSave } from "../lib/io/@types";
import { ObjectType } from "../lib/parser/@types";

class SV {
  private parser: Parser;
  private io: IO;
  private transition: SVObject;

  public keys: Array<string>;
  public object: Array<ObjectType>;

  constructor() {
    this.parser = new Parser();
    this.io = new IO();
    this.transition = new SVObject();

    this.keys = [];
    this.object = [];
  }

  /**
   * This function opens the .fsm file; get the table headers and then
   * also generated the transition object array and returns the array
   * @param { string } filepath
   * @returns { Promise<Array<ObjectType>> }
   */
  async create(filepath: string): Promise<Array<ObjectType>> {
    return this.io.read(filepath).then((value) => {
      this.keys = this.parser.get_table_header(value);
      this.object = this.parser.generate_object(value);
      return this.object;
    });
  }

  /**
   * This function saves the generates finite state transition object
   * as a JSON to the specified location and filename
   * @param { string } filepath
   * @returns { Promise<number> }
   */
  save(filepath: string): IOSave {
    return this.io.save(filepath, this.object);
  }

  /**
   * This function gets and return all the states from within the
   * finite state machine
   * @returns { Array<string> }
   */
  get getKeys(): Array<string> {
    return this.transition.getAllKeys(this.object);
  }
}

export default SV;
