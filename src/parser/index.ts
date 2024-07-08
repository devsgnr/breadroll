import neatCsv from "neat-csv";
import Dataframe from "../object";
import { DataframeReadOptions } from "../types";
import { parse } from "./utils";

class Parser {
  private object: Array<Record<string, unknown>>;
  private csv: typeof neatCsv;

  constructor() {
    this.object = [];
    this.csv = neatCsv;
  }

  /**
   * This function run through the file and generate an array of
   * JavaScript objects
   * @param { string } table
   * @returns { Dataframe }
   */
  async generate_object<T extends Record<string, unknown>>(table: string, sep: string, options: DataframeReadOptions): Promise<Dataframe<T>> {
    this.object = await this.csv(table, { separator: sep, mapValues: ({ value }) => parse(value, options) });
    return new Dataframe<T>(this.object as T[]);
  }
}

export default Parser;
