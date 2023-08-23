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

const FilterObject: FilterType = Object.freeze({
  equals: (dataframe: Array<ObjectType>, key: string, value: unknown): DFObject => {
    const copy = Object.assign(dataframe.filter((object) => object[key] === value));
    return new DFObject(copy);
  },

  "not equals": (dataframe: Array<ObjectType>, key: string, value: unknown): DFObject => {
    const copy = Object.assign(dataframe.filter((object) => object[key] !== value));
    return new DFObject(copy);
  },

  contains: (dataframe: Array<ObjectType>, key: string, value: unknown): DFObject => {
    const copy = Object.assign(dataframe.filter((object) => (<string>object[key]).includes(<string>value)));
    return new DFObject(copy);
  },

  "greater than": (dataframe: Array<ObjectType>, key: string, value: unknown): DFObject => {
    const copy = Object.assign(dataframe.filter((object) => <number>object[key] > <number>value));
    return new DFObject(copy);
  },

  "less than": (dataframe: Array<ObjectType>, key: string, value: unknown): DFObject => {
    const copy = Object.assign(dataframe.filter((object) => <number>value > <number>object[key]));
    return new DFObject(copy);
  },
});

export { Condition, FilterObject, FilterType };
