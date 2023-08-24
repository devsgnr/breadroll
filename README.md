# ts_df

### ⚠️ EXPERIMENTAL - This is still in development with a lot of work that needs to be done, it is very rough around the edges.

A simple lightweight application library for parsing csv and tsv and performing EDA (exploratory data analysis) think pandas but written in Typescript and developed on the Bun.js Runtime.

Here an example with a dataset gotten from [Kaggle](https://www.kaggle.com/datasets/inductiveanks/employee-salaries-for-different-job-roles)

```typescript
const file = new DataframeFile("./test/data/ds_salaries.csv", { header: true, delimiter: "," });
const df = await file.open();

const salaries_over_70k = df.filter("salary", "greater than", 70000); // 447;
```

Here another example with a dataset from [UC Irvine's Machine Learning Repository](https://archive.ics.uci.edu/dataset/2/adult)

```typescript
const file = new DataframeFile("./test/data/adult.data", { header: true, delimiter: "," });
const df = await file.open();

const age_greater_than_45 = df.filter("age", "greater than", 45).filter("workclass", "equals", "Private"); // 5614
```

This project was created using `bun init` in bun v0.6.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
