import Dataframe from ".";
import { ObjectType } from "../parser/@types/object.types";
import { FilterType } from "./@types/filter.types";

const Filters: FilterType = {
  "equal to": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => object[key] === value));
    return new Dataframe(copy);
  },

  "not equal to": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => object[key] !== value));
    return new Dataframe(copy);
  },

  contains: (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => (<string>object[key]).includes(<string>value)));
    return new Dataframe(copy);
  },

  "greater than": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => <number>object[key] > <number>value));
    return new Dataframe(copy);
  },

  "less than": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => <number>value > <number>object[key]));
    return new Dataframe(copy);
  },
  "greater than or equal to": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
    const copy = Object.assign(dataframe.filter((object) => <number>object[key] >= <number>value));
    return new Dataframe(copy);
  },

  "less than or equal to": (dataframe: Array<ObjectType>, key: string, value: unknown): Dataframe => {
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
