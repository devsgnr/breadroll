import DFObject from ".";
import { ObjectType } from "../parser/@types/object.types";
import { FilterType } from "./@types/filter.types";

const Filters: FilterType = {
  "equal to": (dataframe: Array<ObjectType>, key: string, value: unknown): DFObject => {
    const copy = Object.assign(dataframe.filter((object) => object[key] === value));
    return new DFObject(copy);
  },

  "not equal to": (dataframe: Array<ObjectType>, key: string, value: unknown): DFObject => {
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
  "greater than or equal to": (dataframe: Array<ObjectType>, key: string, value: unknown): DFObject => {
    const copy = Object.assign(dataframe.filter((object) => <number>object[key] >= <number>value));
    return new DFObject(copy);
  },

  "less than or equal to": (dataframe: Array<ObjectType>, key: string, value: unknown): DFObject => {
    const copy = Object.assign(dataframe.filter((object) => <number>value >= <number>object[key]));
    return new DFObject(copy);
  },

  "is between": (dataframe: Array<ObjectType>, key: string, value: unknown, limit?: unknown): DFObject => {
    if (!limit) throw new Error("Provide the upper limit");
    const copy = Object.assign(dataframe.filter((object) => <number>object[key] >= <number>value && <number>object[key] <= <number>limit));
    return new DFObject(copy);
  },
};

export default Filters;
