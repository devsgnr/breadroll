import { ObjectType } from "../../types";

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

/**
 * This function converts the text from either a csv or tsv
 * string and converts it to a Blob with appropriate MIME type and
 * return the blob object
 * @param { string } data
 * @param { string } mime_type
 * @returns { Blob }
 */
const to_blob = (data: string, mime_type: string): Blob => {
  const blob = new Blob([data], { type: mime_type });
  return blob;
};

export { to_blob, create_sv };
