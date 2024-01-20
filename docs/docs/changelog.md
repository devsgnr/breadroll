# Changelog

### **January 19th, 2024 - v0.3**

- `Dataframe.to_blob(filetype: "csv" | "tsv"): Blob` This function converts the current dataframe into a Blob of MIME filetype `"csv" | "tsv"`
- `Dataframe.save`
  - `.json(filepath: string)`
    This function saves `Dataframe` as a JSON files ie. for example `Dataframe.save.json(filepath: string)`.
  - `.csv(filepath: string)`
    This function saves `Dataframe` as a CSV files ie. for example `Dataframe.save.csv(filepath: string)`.
  - `.tsv(filepath: string)`
    This function saves `Dataframe` as a TSV files ie. for example `Dataframe.save.tsv(filepath: string)`.

### **Sept 15th, 2023 - v0.2**

- `Dataframe.min(key: string): number` This function returns the minimum value of all the values of the specified column ie. key. Note, the values are coerse into a number type
- `Dataframe.max(key: string): number` This function returns the maximum value of all the values of the specified column ie. key. Note, the values are coerse into a number type
- `Dataframe.sum(key: string): number` This function returns the sum of all the values of the specified column ie. key. Note, the values are coerse into a number type
- `Dataframe.average(key: string): number` This function returns the average of all the values of the specified column ie. key. Note, the values are coerse into a number type

### **Aug 27th, 2023 - v0.1.3**

- `Dataframe.use(callback: (dataframe: Array<ObjectType>) => Dataframe): Dataframe` it provides access to the object ie. it kinda ejects from the base class allowing user to perform their own custom operation on a the current dataframe version, eg. after running `Dataframe.filter`
- Added more filters, `greater than or equal to`, `less than or equal to`, `in between`
- Tweaked `Dataframe.filter` to take a fourth and optional argument `limit` for range filters like `in between`

### **Aug 19th, 2023 - v0.1**

- `Dataframe.head: Dataframe` returns the first five rows of the dataframe
- `Dataframe.labels: Array<string>` returns the labels of the dataframe
- `Dataframe.filter(key: string, filter: Condition, value: unknown)` - filters the rows in `Dataframe` and returns `Dataframe(dataframe)`
- `Dataframe.value` - exposes the `Dataframe`'s dataframe as `Array<ObjectType>`
- `Dataframe.count` - returns the count of rows in the dataframe or dataframe object
- `Dataframe.isNull` - returns all the rows that have some properties equal to `null`
- `Dataframe.notNull` - returns all the rows that have every property equal to `!null`
- `Dataframe.dtypes` - returns all the data types of all the columns in the dataframe
