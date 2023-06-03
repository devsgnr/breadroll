import { TransitionObject } from "./@types";

class Parser {
  public keys: Array<string>;
  public states: Array<string>;
  public state_transition_object: Array<TransitionObject>;

  constructor() {
    this.keys = [];
    this.states = [];
    this.state_transition_object = [];
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
   * This function is used to build a JavaScript object of type TransitionObject
   * it is used by `this.generate_transition_object` to make the fnuction less verbose
   * @param { string } line
   * @returns { TransitionObject }
   */
  private object_builder(line: string): TransitionObject {
    let state: TransitionObject = {};
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
   * @returns { Array<TransitionObject> }
   */
  generate_transition_object(state_table: string): Array<TransitionObject> {
    const table = state_table.split("\n").splice(1);
    this.state_transition_object = table.map((line: string) => {
      return this.object_builder(line);
    });
    return this.state_transition_object;
  }
}

export default Parser;
