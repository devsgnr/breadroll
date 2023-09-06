import { Dataframe } from "../../lib";
import { ObjectType } from "../../lib/parser/@types/object.types";

export type DataframeReadOptions = {
  header: boolean;
  delimiter: string;
  keys?: Array<string>;
};

export type DFCustomType = {
  operation: (callback: (object: Array<ObjectType>) => Dataframe) => Dataframe;
};
