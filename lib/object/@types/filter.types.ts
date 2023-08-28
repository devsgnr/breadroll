import DFObject from "..";
import { ObjectType } from "../../parser/@types/object.types";

/**
 * Types Definitions
 * Condition - the list of string allowed as identifiers for selecting filter functions
 */
type Condition = "equal to" | "not equal to" | "contains" | "greater than" | "less than" | "greater than or eqaul to" | "less than or equal to" | "is between";

type FilterType = {
  [key: string]: (dataframe: Array<ObjectType>, key: string, value: unknown, limit?: unknown) => DFObject;
};

export { Condition, FilterType };
