import { DFObject } from "../../lib";
import { ObjectType } from "../../lib/parser/@types/object.types";

export type DataframeReadOptions = {
  header: boolean;
  delimiter: string;
  keys?: Array<string>;
};

export type DFCustomType = {
  [key: string]: (callback: (object: Array<ObjectType>) => DFObject) => DFObject;
};
