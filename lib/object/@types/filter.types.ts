import DFObject from "..";
import { ObjectType } from "../../parser/@types/object.types";

/**
 * Types Definitions
 * Condition - the list of string allowed as identifiers for selecting filter functions
 */
type Condition = "equals" | "not equals" | "contains" | "greater than" | "less than";

type FilterType = {
  [key: string]: (dataframe: Array<ObjectType>, key: string, value: unknown) => DFObject;
};

export { Condition, FilterType };
