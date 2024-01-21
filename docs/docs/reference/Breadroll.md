#### `Breadroll(...)`
Parameters

  - `options: DataframeReadOptions`
    - `DataframeReadOptions.header: boolean` when set to `true`, Breadroll automatically gets the header from the file
    - `DataframeReadOptions.delimiter: string` the delimiting string, it could be a variety of delimiter, eg. `","` and more
    - `DataframeReadOptions.keys?: Array<string>` this is an optional property for when `DataframeReadOptions.header` is `false`

#### `Breadroll.open`

- `.local(...)`
  This function open the local data source, ie. the file on disk and return a Dataframe

    Parameter

    - `filepath: string` - the location of the file.

      ```typescript
      const file: Breadroll = new Breadroll({ header: true, delimiter: "," });
      const df: Dataframe = await file.open("./test/data/adult.data");
      const filtered = df.filter("workclass", "equals", "Private").count;
      ```