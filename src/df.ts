import { IO, Parser, Dataframe } from "../lib";
import { IOSave } from "../lib/io/@types/io.types";
import { ObjectType } from "../lib/parser/@types/object.types";
import { DataframeReadOptions } from "./@types/df.types";

class TSDF {
  private parser: Parser;
  private io: IO;

  private filepath: string;
  private options: DataframeReadOptions;

  public object: Dataframe;

  constructor(filepath: string, options: DataframeReadOptions) {
    this.filepath = filepath;
    this.options = options;

    this.object = new Dataframe([]);

    this.parser = new Parser();
    this.io = new IO();
  }

  /**
   * This function opens the seperated value file; gets the table headers (if present)
   * and then also generate the object array and returns the array
   * @returns { Promise<Array<ObjectType>> }
   */
  async open(): Promise<Dataframe> {
    return this.io
      .read(this.filepath)
      .then((value) => {
        this.parser.get_table_header(value, this.options);
        this.object = this.parser.generate_object(value, this.options);
        return this.object;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * This function saves the generates finite state DataframeObj object
   * as a JSON to the specified location and filename
   * @param { string } filepath
   * @returns { Promise<number> }
   */
  save(object: Array<ObjectType>, filepath: string): IOSave {
    return this.io.save(filepath, object);
  }
}

export default TSDF;
