import { TransitionObject } from "../parser/@types";

class Transition {
  public states: Array<string>;

  constructor() {
    this.states = [];
  }

  /**
   * This function returns all the states with the finite state machine
   * in a list (array) of string
   * @param { Array<TransitionObject> } state_table
   * @returns { Array<string> }
   */
  getAllStates(state_table: Array<TransitionObject>): Array<string> {
    this.states = state_table.map((state: TransitionObject) => {
      return state.state;
    });
    return this.states;
  }
}

export default Transition;
