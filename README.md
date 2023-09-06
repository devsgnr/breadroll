# ts_df

⚠️ EXPERIMENTAL - This is still in active development and very much experimental, it is still in it's early stages very rough around the edges.

ts_df, short for **Typescript Dataframe**, is a simple lightweight application library for parsing csv, tsv and other delimited file, for statistical, EDA (exploratory data analysis) and SIMD (single instruction / multiple data) operations on multivariate datasets. Think `pandas` but written in Typescript and developed on the Bun.js Runtime.

Here an example with a dataset gotten from [Kaggle](https://www.kaggle.com/datasets/inductiveanks/employee-salaries-for-different-job-roles)

```typescript
const file: TSDF = new TSDF("./test/data/ds_salaries.csv", { header: true, delimiter: "," });
const df: Dataframe = await file.open();

const salaries_over_70k = df.filter("salary", "greater than", 70000).count; // 447;
```

Here another example with a dataset from [UC Irvine's Machine Learning Repository](https://archive.ics.uci.edu/dataset/2/adult)

```typescript
const file: TSDF = new TSDF("./test/data/adult.data", { header: true, delimiter: "," });
const df: Dataframe = await file.open();

const workclass_equals_private = df.filter("workclass", "equals", "Private").count; // 22,696
```

This project was created using `bun init` in bun v0.6.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## `TSDF`

- #### `TSDF(filepath: string, options: DataframeReadOptions)`
  - `filepath: string` - the location of the file.
  - `options: DataframeReadOptions`
    - `DataframeReadOptions.header: boolean` when set to `true`, `TSDF.open()` automatically gets the header from the file
    - `DataframeReadOptions.delimiter: string` the delimiting string, it could be a variety of delimiter, the likes of `",", "\t"` and more
    - `DataframeReadOptions.keys?: Array<string>` this is an optional property for when `DataframeReadOptions.header` is `false`
- #### `TSDF.open()`
  This function opens and parses the specified file path in the `TSDF()` instance, then returns `Dataframe`
- #### `TSDF.save(data: Dataframe, filepath: string)`
  This function saves `Dataframe.value` as a few type of files ie. for example `TSDF.save(Dataframe, filepath).as.json()`, more file types will be added soon.

## `Dataframe`

- #### `Dataframe.count`

  This function returns the count of rows `number`, the most especially useful when use in tandem with the `Dataframe.filter()`

  ```typescript
  const file: TSDF = new TSDF("./test/data/adult.data", { header: true, delimiter: "," });
  const df: Dataframe = await file.open();

  const workclass_equals_private = df.filter("workclass", "equals", "Private").count; // 22,696
  ```

- #### `Dataframe.labels`

  This function returns an array of strings `Array<string>` ie. the labels of each column of the dataframe

  ```typescript
  const df_labels = df.labels; // ["age", "race", "workclass", ...]
  ```

- #### `Dataframe.head`

  This function return an array of objects `Array<ObjectType>`. NB: `ObjectType` is a custom type.

  ```typescript
  const df_labels = df.head; // [{}, {}, {}, ...]
  ```

- #### `Dataframe.isNull`

  This function return a new Dataframe object `Dataframe` where some of it properties have a `null`

  ```typescript
  const isNull = df.isNull; // Dataframe()
  ```

- #### `Dataframe.notNull`

  This function return a new Dataframe object `Dataframe` where none of it properties have a `null`, the inverse of `Dataframe.isNull`

  ```typescript
  const notNull = df.notNull; // Dataframe()
  ```

- #### `Dataframe.dtypes`

  This function return an object `ObjectType` that shows the data type of each column in the dataframe in a key:value pair

  ```typescript
  const dtypes = df.dtypes; // { age: "number", workclass: "string", ... }
  ```

- #### `Dataframe.value`

  This function exposes ie. returns an array of objects `Array<ObjectType>` that is within the `Dataframe`

  ```typescript
  const dtypes = df.value; // [{}, {}, {}, ...]
  ```

- #### `Dataframe.filter(key: string, filter: Condition, value: unknown, limit?: unknown)`

  This function returns `Dataframe` and it is used to filter out `Dataframe`, by checking if `key` which is the column label against a filter condition `Condition` using `value`
  **Note:** `limit` is an optional fourth argument that is used with range filters like `in between`

  ```typescript
  const filtered_salary = df.filter("salary", "greater than", 70000); // Dataframe
  ```

  Multiple / Chained Filter: you can chain the filter ie. filtering the previously filtered `Dataframe`, the chained filter can be as long as you need them to be;

  ```typescript
  const salary_and_year = df.filter("salary", "greater than", 70000).filter("work_year", "equals", 2020); // Dataframe
  ```

  Programmatic Multiple / Chained Filters:
  **Coming Soon**

---

### Author(s)

- [Emmanuel Watila](https://devsgnr.xyz) ([@devsgnr](https://github.com/devsgnr))
