#### `Breadroll(filepath: string, options: DataframeReadOptions)`
  
  - `filepath: string` - the location of the file.
  - `options: DataframeReadOptions`
    - `DataframeReadOptions.header: boolean` when set to `true`, `Breadroll.open()` automatically gets the header from the file, ie. the first line
    - `DataframeReadOptions.delimiter: string` the delimiting string, it could be a variety of delimiter, the likes of `","`, `"\t"` and more
    - `DataframeReadOptions.keys?: Array<string>` this is an optional property for when `DataframeReadOptions.header` is `false`
#### `Breadroll.open()`
  - This function opens and parses the specified file path in the `Breadroll()` instance, then returns `Dataframe`

```typescript
const file: Breadroll = new Breadroll("./test/data/adult.data", { header: true, delimiter: "," });
const df: Dataframe = await file.open();

const workclass_equals_private = df.filter("workclass", "equals", "Private").count; // 22,696
```