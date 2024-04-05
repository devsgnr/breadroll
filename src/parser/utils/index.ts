import { DataframeReadOptions } from "../../types";

/**
 * The function attempts to parse a string to a floating point number
 * it check if
 * 1. the value is an empty string and is NaN and then returns nulll
 * 2. the value is not an empty string and is NaN and then return a string
 * 3. then finally returns the parsed value ie. if value is not an empty string
 *    and NaN is false
 * @param { string } value
 * @returns { string | number | null }
 */
const parse = (value: string, options: DataframeReadOptions): string | number | null => {
  const num = parseFloat(value);

  if (!value) return null;
  if (!isNaN(num) && options.parseNumber) return num;
  if (!isNaN(num) && !options.parseNumber) return value;
  return value;
};

/**
 * Performs the same actions as `parser/utils/parse` but without needing the
 * DataframeOptions
 * @param { string } value
 * @returns { string | number | null }
 */
const defaultparse = (value: string): string | number | null => {
  const num = parseFloat(value);

  if (!value) return null;
  if (!isNaN(num)) return num;
  if (isNaN(num)) return value;
  return value;
};

export { parse, defaultparse };
