import { ObjectType, IOSave } from "../types";
import { create_sv, to_blob } from "./utils";

class IO {
  /**
   * This function opens the file, reads its content
   * converts to a string and then returns the value
   * @param {string} filepath
   * @returns { Promise<string> }
   */
  async read(filepath: string): Promise<string> {
    return await Bun.file(filepath)
      .text()
      .then((value: string) => {
        return value;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * This function provides an interface for saving the dataframe in
   * three various formats; ie. json, csv, and tsv
   * @param { Array<ObjectType> } data
   * @returns { IOSave }
   */
  save(data: Array<ObjectType>): IOSave {
    const json = async (location: string): Promise<number> => {
      return Bun.write(location, JSON.stringify(data, null, 2))
        .then((value) => {
          return value;
        })
        .catch((err) => {
          throw new Error(err);
        });
    };

    const csv = async (location: string): Promise<number> => {
      return Bun.write(location, create_sv(data, ","))
        .then((value) => {
          return value;
        })
        .catch((err) => {
          throw new Error(err);
        });
    };

    const tsv = async (location: string): Promise<number> => {
      return Bun.write(location, create_sv(data, "\t"))
        .then((value) => {
          return value;
        })
        .catch((err) => {
          throw new Error(err);
        });
    };

    return {
      json,
      csv,
      tsv,
    };
  }

  /**
   * This function converts the dataframe into either a csv or
   * a tsv string, and then converts the string into a blob object
   * @param { Array<ObjectType> } data
   * @param { string } filetype
   * @returns { Blob }
   */
  toBlob(data: Array<ObjectType>, filetype: "csv" | "tsv"): Blob {
    const type: { [key: string]: string } = {
      csv: create_sv(data, ","),
      tsv: create_sv(data, "\t"),
    };

    return to_blob(type[filetype], ["text/", filetype].join(""));
  }
}

export default IO;
