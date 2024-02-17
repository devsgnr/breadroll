import Dataframe from ".";
import { ObjectType } from "../types";
import { FilterType } from "../types";

const Filters: FilterType = {
  "==": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => object[key] === value));
    return new Dataframe(copy);
  },

  "!=": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => object[key] !== value));
    return new Dataframe(copy);
  },

  E: (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => String(object[key]).includes(<string>value)));
    return new Dataframe(copy);
  },

  matches: (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const re: RegExp = value as RegExp;
    const copy = Object.assign(dataframe.filter((object) => re.test(<string>object[key])));
    return new Dataframe(copy);
  },

  ">": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => <number>object[key] > <number>value));
    return new Dataframe(copy);
  },

  "<": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => <number>value > <number>object[key]));
    return new Dataframe(copy);
  },
  ">=": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => <number>object[key] >= <number>value));
    return new Dataframe(copy);
  },

  "<=": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => <number>value >= <number>object[key]));
    return new Dataframe(copy);
  },

  "is between": (dataframe: Array<ObjectType>, key: string, value: unknown, limit?: unknown): Dataframe => {
    if (!limit) throw new Error("Provide the upper limit");
    const copy = Object.assign(dataframe.filter((object) => <number>object[key] >= <number>value && <number>object[key] <= <number>limit));
    return new Dataframe(copy);
  },
};

export default Filters;
