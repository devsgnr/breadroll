import { ObjectType } from "../../parser/@types/object.types";

const create_sv = (data: Array<ObjectType>, delimeter: string): string => {
  /**
   * Initialize the value for header by getting the keys of a single
   * value in the array, then add the header as the first element of the
   * array of strings
   */
  const header: string = Object.keys(data[0]).join(delimeter);
  const accumulator: Array<string> = [header];
  /**
   * Loop over data and covert each values in a string
   * seperated by commas, and then push them into the accumulator
   * array
   */
  data.map((value) => {
    accumulator.push(Object.values(value).join(delimeter));
  });

  /**
   * Finally join the whole array into one big string delimited by
   * a newline
   */
  const sv: string = accumulator.join("\n");

  return sv;
};

export default create_sv;
