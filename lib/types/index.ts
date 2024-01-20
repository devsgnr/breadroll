import Dataframe from "../object";

/**
 * Type Definition
 * DataframeReadOptions - the type definition for the parameter of the Breadroll second constructor argument
 */
type DataframeReadOptions = {
  header: boolean;
  delimiter: string;
  keys?: Array<string>;
};

/**
 * Type Definition
 * IOSave - the type definition for the return type of the IO.save getter method of the IO class
 */
type IOSave = {
  json: (location: string) => Promise<number>;
  csv: (location: string) => Promise<number>;
  tsv: (location: string) => Promise<number>;
};

/**
 * Types Definitions
 * Condition - the list of string allowed as identifiers for selecting filter functions
 * FilterType - the object type definition for the filter object
 */
type Condition = "equal to" | "not equal to" | "contains" | "greater than" | "less than" | "greater than or equal to" | "less than or equal to" | "is between";

type FilterType = {
  [key: string]: (dataframe: Array<ObjectType>, key: string, value: unknown, limit?: unknown) => Dataframe;
};

/**
 * Type Definition
 * ObjectType - the object type definition for the Dataframe object
 */
type ObjectType = {
  [key: string]: string | unknown;
};

/**
 * Enumeration Definition
 * EscapeSeq - hold all the escape characters
 */
enum EscapeSeq {
  NEW_LINE = "\n",
  CARRIAGE_RETURN = "\r",
  HORIZONTAL_TAB = "\t",
  COMMA = ",",
}

export { DataframeReadOptions, IOSave, Condition, FilterType, ObjectType, EscapeSeq };
