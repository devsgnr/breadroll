/**
 * The function attempts to parse a string to a floating point number
 * it check if
 * 1. the value is an empty string and is NaN and then returns nulll
 * 2. the value is not an empty string and is NaN and then return a string
 * 3. then finally returns the parsed value ie. if value is not an empty string
 *    and NaN is false
 * @param {string} value
 * @returns {string | number | null}
 */
const parseIfNumber = (value: string): string | number | null => {
  const parsed = parseFloat(value);
  if (value === "" && Number.isNaN(parsed) === true) return null;
  if (value !== "" && Number.isNaN(parsed) === true) return value;
  else return parsed;
};

export { parseIfNumber };
