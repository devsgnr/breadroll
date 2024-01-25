import IO from "./io";
import Dataframe from "./object";
import Parser from "./parser";
import { BreadrollOpen, DataframeReadOptions } from "./types";

/**
 * breadroll 🥟 is a simple lightweight application library for parsing csv, tsv,
 * and other delimited files, performing EDA (exploratory data analysis),
 * and data processing operations on multivariate datasets. Think pandas but written in
 * Typescript and developed on the [Bun](https://bun.sh) Runtime.
 */
class Breadroll {
  private parser: Parser;
  private io: IO;

  private options: DataframeReadOptions;
  public object: Dataframe;

  constructor(options: DataframeReadOptions) {
    this.options = options;
    this.object = new Dataframe([]);
    this.parser = new Parser();
    this.io = new IO();
  }

  /**
   * This function opens the seperated value file; gets the table headers (if present)
   * and then also generate the object array and returns the array
   * @returns { BreadrollOpen }
   */
  get open(): BreadrollOpen {
    /**
     * This function opens the local data source ie. the file on disk, reads it
     * and converts it to a Dataframe
     * @param { string } filepath
     * @returns { Promise<Dataframe> }
     */
    const local = async (filepath: string): Promise<Dataframe> => {
      return this.io
        .read(filepath)
        .then((value) => {
          this.parser.get_table_header(value, this.options);
          this.object = this.parser.generate_object(value, this.options);
          return this.object;
        })
        .catch((err) => {
          throw new Error(err);
        });
    };

    /**
     * This function fetchs and return a file via a URL over https, with a default `GET` method
     * read and converts the file to a Dataframe, with provision for optional custom headers
     * @param { string } url
     * @param { Headers } headers
     * @returns { Promise<Dataframe> }
     */
    const https = async (url: string, headers?: Headers): Promise<Dataframe> => {
      const req: Request = new Request(url);

      return await fetch(req, { method: "GET", headers: headers })
        .then((response: Response) => response.text())
        .then((value) => {
          this.parser.get_table_header(value, this.options);
          this.object = this.parser.generate_object(value, this.options);
          return this.object;
        })
        .catch((err) => {
          throw new Error(err);
        });
    };

    return {
      local: local,
      https: https,
    };
  }
}

export default Breadroll;
export { Dataframe };
