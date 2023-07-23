import { ObjectType } from "../parser/@types/object.types";
import { IOSave } from "./@types/io.types";

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

  save(location: string, data: Array<ObjectType>): IOSave {
    const json = async (): Promise<number> => {
      return Bun.write(location, JSON.stringify(data, null, 2))
        .then((value) => {
          return value;
        })
        .catch((err) => {
          throw new Error(err);
        });
    };

    return {
      as: {
        json,
      },
    };
  }
}

export default IO;
