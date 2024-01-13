import { ObjectType } from "../parser/@types/object.types";
import { IOSave } from "./@types/io.types";
import create_sv from "./utils/create_csv";

class IO {
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
}

export default IO;
