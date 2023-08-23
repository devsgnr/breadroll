## ts_df

⚠️ EXPERIMENTAL - This is still in development with a lot of work that needs to be done, it is very rough around the edges.

A simple lightweight application library for parsing csv and tsv and performing EDA (exploratory data analysis) think pandas but written in Typescript and developed on the Bun.js Runtime.

```typescript
const file: DF = new DF("./test/test.csv", { header: true, delimiter: "," });
const df = file.open();

const has_good_appetite: DFObject = df.filter("appet", "equals", "good");
console.log(has_good_appetite.count); // 316

const isNull: DFObject = df.isNull;
console.log(isNull.count); // 382
```

This project was created using `bun init` in bun v0.6.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
