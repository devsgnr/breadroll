import { ObjectType } from "./@types";

const NEW_LINE = "\n";

class Parser {
  public keys: Array<string>;
  public states: Array<string>;
  public object: Array<ObjectType>;

  constructor() {
    this.keys = [];
    this.states = [];
    this.object = [];
  }

  /**
   * This assigns the table header of the `.fsm` file to `this.keys` and
   * return the value as an array of string containing each key. Note:
   * this is case insensitive, ie. it converts the headers to lowercase regardless
   * @param { string } state_table
   * @returns { Array<string> }
   */
  get_table_header(state_table: string): Array<string> {
    const table_header = state_table.split("\n", 1)[0].split(",");
    this.keys = table_header.map((header) => header.toLocaleLowerCase());
    return this.keys;
  }

  /**
   * @private
   * This function is used to build a JavaScript object of type ObjectType
   * it is used by `this.generate_transition_object` to make the fnuction less verbose
   * @param { string } line
   * @returns { ObjectType }
   */
  private object_builder(line: string): ObjectType {
    let state: ObjectType = {};
    line.split(",").map((value: string, index: number) => {
      state = { ...state, ...{ [this.keys[index]]: value } };
    });
    return state;
  }

  /**
   * This function run through the `.fsm` file and generate an array of
   * JavaScript objects that define the transition for each state when
   * given a certain input
   * @param { string } state_table
   * @returns { Array<ObjectType> }
   */
  generate_object(state_table: string): Array<ObjectType> {
    const table = state_table.split(NEW_LINE).splice(1);
    this.object = table.map((line: string) => this.object_builder(line));
    return this.object;
  }
}

export default Parser;
