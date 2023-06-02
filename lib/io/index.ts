import { TransitionObject } from "../parser/@types";
import { IOSave } from "./@types";

class IO {
  async read(filepath: string): Promise<string> {
    const file = Bun.file(filepath);
    return await file.text().then((value: string) => {
      return value;
    });
  }

  save(location: string, data: Array<TransitionObject>): IOSave {
    const json = async (): Promise<number> => {
      return await Bun.write(location, JSON.stringify(data, null, 2)).then(
        (value) => {
          return value;
        }
      );
    };
    return { as: { json } };
  }
}

export default IO;
