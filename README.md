# ts_df

⚠️ EXPERIMENTAL - This is still in active development and very much experimental, it is still in it's early stages very rough around the edges.

ts_df, short for **Typescript Dataframe**, is a simple lightweight application library for parsing csv, tsv and other delimited file, for statistical, EDA (exploratory data analysis) and SIMD (single instruction / multiple data) operations on multivariate datasets. Think `pandas` but written in Typescript and developed on the Bun.js Runtime.

Here an example with a dataset gotten from [Kaggle](https://www.kaggle.com/datasets/inductiveanks/employee-salaries-for-different-job-roles)

```typescript
const file: DataFile = new DataFile("./test/data/ds_salaries.csv", { header: true, delimiter: "," });
const df: DFObject = await file.open();

const salaries_over_70k = df.filter("salary", "greater than", 70000).count; // 447;
```

Here another example with a dataset from [UC Irvine's Machine Learning Repository](https://archive.ics.uci.edu/dataset/2/adult)

```typescript
const file: DataFile = new DataFile("./test/data/adult.data", { header: true, delimiter: "," });
const df: DFObject = await file.open();

const workclass_equals_private = df.filter("workclass", "equals", "Private").count; // 22,696
```

This project was created using `bun init` in bun v0.6.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## `DFObject`

- #### `DFObject.count`

  This function returns the count of rows `number`, the most especially useful when use in tandem with the `DFObject.filter()`

  ```typescript
  const file: DataFile = new DataFile("./test/data/adult.data", { header: true, delimiter: "," });
  const df: DFObject = await file.open();

  const workclass_equals_private = df.filter("workclass", "equals", "Private").count; // 22,696
  ```

- #### `DFObject.labels`

  This function returns an array of strings `Array<string>` ie. the labels of each column of the dataframe

  ```typescript
  ...
  const df_labels = df.labels; // ["age", "race", "workclass", ...]
  ```

- #### `DFObject.head`

  This function return an array of objects `Array<ObjectType>`. NB: `ObjectType` is a custom type.

  ```typescript
  ...
  const df_labels = df.head; // [{}, {}, {}, ...]
  ```

- #### `DFObject.isNull`

  This function return a new Dataframe object `DFObject` where some of it properties have a `null`

  ```typescript
  ...
  const isNull = df.isNull; // DFObject()
  ```

- #### `DFObject.notNull`

  This function return a new Dataframe object `DFObject` where none of it properties have a `null`, the inverse of `DFObject.isNull`

  ```typescript
  ...
  const notNull = df.notNull; // DFObject()
  ```

- #### `DFObject.dtypes`

  This function return an object `ObjectType` that shows the data type of each column in the dataframe in a key:value pair

  ```typescript
  ...
  const dtypes = df.dtypes; // { age: "number", workclass: "string", ... }
  ```

- #### `DFObject.value`

  This function exposes ie. returns an array of objects `Array<ObjectType>` that is within the `DFObject`

  ```typescript
  ...
  const dtypes = df.value; // [{}, {}, {}, ...]
  ```

- #### `DFObject.filter(key: string, filter: Condition, value: unknown)`

  This function returns `DFObject` and it is used to filter out `DFObject`, by checking if `key` which is the column label against a filter condition `Condition` using `value`

  ```typescript
  ...
  const filtered_salary = df.filter("salary", "greater than", 70000); // DFObject
  ```

  Multiple / Chained Filter: you can chain the filter ie. filtering the previously filtered `DFObject`, the chained filter can be as long as you need them to be;

  ```typescript
  ...
  const salary_and_year = df.filter("salary", "greater than", 70000).filter("work_year", "equals", 2020); // DFObject
  ```

  Programmatic Multiple / Chained Filters:
