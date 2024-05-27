import IO from "./io";
import Dataframe from "./object";
import Parser from "./parser";
import NumericConstants from "./numeric_constants";
import { BreadrollOpen, DataframeReadOptions } from "./types";
import { isEmpty } from "lodash";

/**
 * breadroll 🥟 is an intuitive lightweight library for type-safe data processing,
 * designed with type-safety, developer experience and reduced runtime errors in mind. Think pandas
 * but written in Typescript and optimized for the [Bun](https://bun.sh) Runtime.
 */
class Breadroll {
  private parser: Parser;
  private io: IO;

  private options: DataframeReadOptions;
  private object: Dataframe;
  private supabase;

  constructor(options: DataframeReadOptions) {
    this.options = { ...options, parseNumber: options.parseNumber ?? true };
    this.object = new Dataframe([]);
    this.parser = new Parser();
    this.io = new IO();
    this.supabase = this.options.supabase;
  }

  /**
   * This function returns an object of functions that opens file; from different sources
   * gets the table headers (if present) and then also generate the Dataframe and returns it
   * @returns { BreadrollOpen }
   */
  get open(): BreadrollOpen {
    /**
     * This function opens the local data source ie. the file on disk, reads it
     * and converts it to a Dataframe
     * @param { string } filepath
     * @returns { Promise<Dataframe> }
     */
    const local = async <T extends Record<string, unknown>>(filepath: string, sep: string): Promise<Dataframe<T>> => {
      return this.io
        .read(filepath)
        .then(async (str) => {
          this.object = await this.parser.generate_object(str, sep, this.options);
          return this.object as Dataframe<T>;
        })
        .catch((err) => {
          throw new Error("File Not Found", { cause: err });
        });
    };

    /**
     * This function fetches and return a file via a URL over https, with a default `GET` method
     * read and converts the file to a Dataframe, with provision for optional custom headers
     * @param { string } url
     * @param { Headers } headers
     * @returns { Promise<Dataframe> }
     */
    const https = async <T extends Record<string, unknown>>(url: string, sep: string, headers?: Headers): Promise<Dataframe<T>> => {
      const req: Request = new Request(url);

      return await fetch(req, { method: "GET", headers: headers })
        .then((response) => response.text())
        .then(async (str) => {
          this.object = await this.parser.generate_object(str, sep, this.options);

          if (isEmpty(this.object.value)) throw new Error("Remote Resource: Not Found");
          return this.object as Dataframe<T>;
        });
    };

    /**
     * This function fetches and returns a file via a via Supabase Storage,
     * read and converts the file to a Dataframe
     * @param { string } bucketName
     * @param { string } filepath
     * @returns { Promise<Dataframe> }
     */
    const supabaseStorage = async <T extends Record<string, unknown>>(bucketName: string, filepath: string, sep: string): Promise<Dataframe<T>> => {
      if (this.supabase) {
        return await this.supabase.storage
          .from(bucketName)
          .download(filepath)
          .then((response) => response.data?.text())
          .then(async (str) => {
            this.object = await this.parser.generate_object(String(str), sep, this.options);

            if (isEmpty(this.object.value)) throw new Error("Supabase: File Error");
            return this.object as Dataframe<T>;
          });
      } else throw new Error("No Supabase Client provided", { cause: {} });
    };

    /**
     * This function reads a JSON object passed in as an argument,
     * read and converts the JSON to a Dataframe, normally the JSON object
     * is a `Record<string, never>` | `{}` converted to fit the requirements
     * for Array<Record<string, unknown>>
     * @param { Array<Record<string, unknown>> } object
     * @returns { Dataframe }
     */
    const json = <T extends Record<string, unknown>>(object: Array<Record<string, unknown>>): Dataframe<T> => {
      return new Dataframe<T>(object as Array<T>);
    };

    return {
      local: local,
      https: https,
      supabaseStorage: supabaseStorage,
      json: json,
    };
  }
}

export default Breadroll;
export { Dataframe, NumericConstants };
