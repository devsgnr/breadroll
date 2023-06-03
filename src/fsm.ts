import { IO, Parser, Transition } from "../lib";
import { TransitionObject } from "../lib/parser/@types";

class FSM {
  private parser: Parser;
  private io: IO;
  private transition: Transition;

  public head: Array<string>;
  public state_transitions: Array<TransitionObject>;

  constructor() {
    this.parser = new Parser();
    this.io = new IO();
    this.transition = new Transition();

    this.head = [];
    this.state_transitions = [];
  }

  /**
   * This function opens the .fsm file; get the table headers and then
   * also generated the transition object array and returns the array
   * @param { string } filepath
   * @returns { Promise<Array<TransitionObject>> }
   */
  async create(filepath: string): Promise<Array<TransitionObject>> {
    await this.io.read(filepath).then((value) => {
      this.head = this.parser.get_table_header(value);
      this.state_transitions = this.parser.generate_transition_object(value);
    });
    return { ...this, ...this.state_transitions };
  }

  /**
   * This function gets and return all the states from within the
   * finite state machine
   * @returns { Array<string> }
   */
  get getStates(): Array<string> {
    return this.transition.getAllStates(this.state_transitions);
  }
}

export default FSM;
