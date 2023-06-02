/**
 * TS_FSM (ts_fsm)
 * A simple lightweight command line application for testing finite state machines
 * Create a .fsm file and run this application from the command line and test your
 * transitions with out having complex knowledge of how finite state machines work
 */

import { IO, Parser } from "./lib";
import { TransitionObject } from "./lib/parser/@types";

class FSM {
  private parser: Parser;
  private io: IO;

  constructor() {
    this.parser = new Parser();
    this.io = new IO();
  }

  /**
   * This function opens the .fsm file; get the table headers and then
   * also generated the transition object array and returns the array
   * @param { string } filepath
   * @returns { Promise<Array<TransitionObject>> }
   */
  async create(filepath: string): Promise<Array<TransitionObject>> {
    return this.io.read(filepath).then((value) => {
      this.parser.get_table_header(value);
      return this.parser.generate_transition_object(value);
    });
  }
}

export default FSM;
