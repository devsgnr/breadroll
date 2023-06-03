export interface TransitionObject {
  state: string;
  input: string;
  next_state: string;
  output: string;
  [key: string]: string | any;
}
