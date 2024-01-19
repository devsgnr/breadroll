import { IO, Parser, Dataframe } from "../lib";
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
}

export default TSDF;
export { Dataframe };
